import React, { useState } from "react";
import "./LoginPage.css";

function RegisterPage() {
  const [playerName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (confirmPassword === password) {
      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerName, password }),
          credentials: "include",
        });

        if (response.ok) {
          console.log("Register successful!");
          window.location.href = "/";
        } else {
          const errorMessage = await response.text();
          setError(errorMessage || "Register failed");
        }
      } catch (err) {
        console.error("Error during register:", err);
        setError("An unexpected error occurred");
      }
    } else {
      setError("Passwords must match");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
          <p style={{ display: 'inline' }}>Have an account already?</p>
          <a href="/login" style={{ display: 'inline', marginLeft: '5px', fontSize: '15px' }}>Log In</a>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;