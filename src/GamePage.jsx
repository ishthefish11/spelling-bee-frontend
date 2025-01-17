import React, { useState, useEffect } from "react";
import s from './GamePage.module.css'; // Import CSS Module
import { ArrowLeftFromLine } from "lucide-react";

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

  localStorage.clear();

  function reset_animation() {
    const el = document.querySelector(`.${s['congratulations-message']}`);
    if (el) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    }
  }
  

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

      if (updatedGame.active) {
        reset_animation();
        setMessage(`Correct! The word was: ${word}!`);
        setIsGameActive(true);
      } else {
        setMessage(`Game over! The word was: ${word}`);
        setIsGameActive(false);
      }
      setWordGuess("");

      if (localStorage.getItem('audioUrl')) {
        localStorage.removeItem('audioUrl');
      }
    } catch {
      setMessage("Error checking the word.");
    }
  };

  const playAudio = async () => {
    if (localStorage.getItem('audioUrl')) {
      const audioUrl = localStorage.getItem('audioUrl');
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      try {
        const response = await fetch(`http://localhost:8080/api/audio/${game.gameId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error();
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        localStorage.setItem('audioUrl', audioUrl);

        const audio = new Audio(audioUrl);
        audio.play();
      } catch {
        setMessage("Error playing the audio.");
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={s['game-page']}> {/* Scoped class */}
      <button className={s['home-btn']} onClick={goBack}>
      <ArrowLeftFromLine /> Go Back
      </button>

      <h1>Spelling Bee Game</h1>

      {message && (
        <p className={
          (isGameActive && message !== "Error checking the word.") 
            ? s['congratulations-message'] 
            : s['incorrect-message']
        }>
          {message}
        </p>
      )}

      {isGameActive && game && (
        <div className={s['game-container']}> {/* Scoped class */}
          <form onSubmit={handleGuess} className={s['guess-form']}> {/* Scoped class */}
            <input
              autoCorrect="off"
              type="text"
              value={wordGuess}
              onChange={(e) => setWordGuess(e.target.value)}
              placeholder="Enter your guess"
              className={s['guess-input']}
            />
            <button type="submit" className={s['submit-btn']}>Submit</button> {/* Scoped class */}
          </form>
          <button onClick={playAudio} className={s['audio-btn']}> {/* Scoped class */}
            Play Word Audio 🔊
          </button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
