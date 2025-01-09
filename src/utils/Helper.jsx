const getPlayerInfo = async () => {
  try {
    // Get playerId from the cookie
    const playerId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("playerId="))
      ?.split("=")[1];

    if (playerId) {
      // If playerId exists, fetch player data
      const response = await fetch(`http://localhost:8080/players/${playerId}`, {
        method: "GET",
        credentials: "include", // Include cookies
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch player by ID: ${response.statusText}`);
      }

      return await response.json();
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

      const player = await playerResponse.json();

      // Set playerId cookie
      document.cookie = `playerId=${player.playerId}; Path=/; Secure; HttpOnly=false; Max-Age=${60 * 60 * 24}`;

      return player;
    }
  } catch (error) {
    console.error("Error fetching player information:", error);
    throw error;
  }
};

export default getPlayerInfo;
