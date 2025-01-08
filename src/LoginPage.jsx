import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [playerName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(
        "http://localhost:8080/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerName, password }),
          credentials: "include", // Ensures cookies like session ID are handled
        }
      );

      if (response.ok) {
        // Login successful
        console.log("Login successful!");
        window.location.href = "/"; // Redirect after successful login
      } else {
        // Handle login failure
        const errorMessage = await response.text();
        setError(errorMessage || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={playerName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
