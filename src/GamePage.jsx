import React, { useState, useEffect } from "react";
import s from './GamePage.module.css'; // Import CSS Module

const GamePage = () => {
  const [game, setGame] = useState(null);
  const [wordGuess, setWordGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isGameActive, setIsGameActive] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const startGame = async () => {
      try {
        const playerId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("playerId="))
          ?.split("=")[1];

        if (!playerId || !isMounted) return;

        const response = await fetch(`http://localhost:8080/play?playerId=${playerId}`, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) throw new Error();

        setGame(await response.json());
      } catch {
        setMessage("Error starting the game.");
      }
    };

    startGame();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleGuess = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/play/${game.gameId}/check-word/${wordGuess}`,
        { method: "GET", credentials: "include" }
      );

      if (!response.ok) throw new Error();

      const { game: updatedGame, word } = await response.json();
      setGame(updatedGame);

      if (!updatedGame.active) {
        setIsGameActive(false);
        setMessage(`Game over! The word was: ${word}`);
      }
    } catch {
      setMessage("Error checking the word.");
    }
  };

  const playAudio = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/audio/${game.gameId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error();

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch {
      setMessage("Error playing the audio.");
    }
  };

  return (
    <div className={s['game-page']}> {/* Scoped class */}
      <h1>Spelling Bee Game</h1>
      {message && <p className={s['message']}>{message}</p>} {/* Scoped class */}
      {isGameActive && game && (
        <div className={s['game-container']}> {/* Scoped class */}
          <form onSubmit={handleGuess} className={s['guess-form']}> {/* Scoped class */}
            <input
              type="text"
              value={wordGuess}
              onChange={(e) => setWordGuess(e.target.value)}
              placeholder="Enter your guess"
              className={s['guess-input']}
            />
            <button type="submit" className={s['submit-btn']}>Submit</button> {/* Scoped class */}
          </form>
          <button onClick={playAudio} className={s['audio-btn']}> {/* Scoped class */}
            Play Pronunciation 🔊
          </button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
