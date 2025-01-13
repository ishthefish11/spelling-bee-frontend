import React, { useState, useEffect } from "react";
// import './GamePage.css';

const GamePage = () => {
  const [game, setGame] = useState(null);
  const [wordGuess, setWordGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isGameActive, setIsGameActive] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted
  
    const startGame = async () => {
      try {
        const playerId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("playerId="))
          ?.split("=")[1];
  
        if (!playerId || !isMounted) return; // Prevent if playerId is not found or if component is unmounted
  
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
      isMounted = false; // Cleanup flag on unmount
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

  return (
    <div>
      <h1>Spelling Bee Game</h1>
      {message && <p>{message}</p>}
      {isGameActive && game && (
        <form onSubmit={handleGuess}>
          <input
            type="text"
            value={wordGuess}
            onChange={(e) => setWordGuess(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default GamePage;
