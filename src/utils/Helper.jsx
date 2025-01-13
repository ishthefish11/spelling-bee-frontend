const getPlayerInfo = async () => {
  try {
    // Get playerId from the cookie
    const playerId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("playerId="))
      ?.split("=")[1];

    let playerData;

    if (playerId) {
      // If playerId exists, fetch player data
      const response = await fetch(`http://localhost:8080/players/${playerId}`, {
        method: "GET",
        credentials: "include", // Include cookies
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch player by ID: ${response.statusText}`);
      }

      playerData = await response.json();
    } else {
      // If playerId cookie doesn't exist, retrieve it using username
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!authToken) {
        throw new Error("No valid authentication token found.");
      }

      // Decode username from the JWT token
      const [, payload] = authToken.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      const playerName = decodedPayload.sub;

      const playerResponse = await fetch(
        `http://localhost:8080/players/username/${playerName}`,
        {
          method: "GET",
          credentials: "include", // Include cookies
        }
      );

      if (!playerResponse.ok) {
        throw new Error(
          `Failed to fetch player by username: ${playerResponse.statusText}`
        );
      }

      playerData = await playerResponse.json();

      // Set playerId cookie
      document.cookie = `playerId=${playerData.playerId}; Path=/; Secure; HttpOnly=false; Max-Age=${60 * 60 * 24}`;
    }

    return playerData;
  } catch (error) {
    console.error("Error fetching player information:", error);
    throw error;
  }
};

const getLeaderboardGames = async () => {
  try {
    const response = await fetch(`http://localhost:8080/games/sorted`, {
      method: "GET",
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard games: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching leaderboard games:", error);
    throw error;
  }
};

const fetchAudioByGameId = async (gameId) => {
  try {
    const response = await fetch(`http://localhost:8080/voice/${gameId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch audio");
    }

    const blob = await response.blob(); // Convert response to a Blob
    const url = URL.createObjectURL(blob); // Create an object URL for the blob
    return url;
  } catch (error) {
    console.error("Error fetching audio:", error);
  }
};


export { getPlayerInfo, getLeaderboardGames, fetchAudioByGameId };
