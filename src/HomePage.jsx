import { useState, useEffect } from 'react';
import { User, Trophy, Settings, PlayCircle } from 'lucide-react';
import './HomePage.css';
import getPlayerInfo from "./utils/Helper";

function HomePage() {
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [profileData, setProfileData] = useState(null); // Add profileData state
  const [error, setError] = useState(null); // Add error state

  const handlePopup = (type) => {
    setPopup(type);
  };

  const closePopup = () => {
    setPopup(null);
  };

  useEffect(() => {
    if (popup === "profile") {
      setLoading(true);
      setError(null);
      getPlayerInfo()
        .then((data) => {
          setProfileData(data);
          setLoading(false);
          console.log(JSON.stringify(data, null, 2));  // Pretty print the JSON data
        })
        .catch((err) => {
          setError("Failed to fetch profile information.");
          setLoading(false);
        });
    }
  }, [popup]);

  return (
    <div className="animated-background">
      <div className="container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <button className="play-btn" onClick={() => alert("Play button clicked!")}>
            <PlayCircle size={24} /> Play
          </button>
          <h1 className="title">Spelling Gauntlet</h1>
          <div className="nav-icons">
            <User onClick={() => handlePopup("profile")} className="icon" />
            <Trophy onClick={() => handlePopup("leaderboard")} className="icon" />
            <Settings onClick={() => handlePopup("settings")} className="icon" />
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          <h2 className="section-title">How to Play?</h2>
          <p className="description">
            Test your spelling skills in the ultimate gauntlet! Spell words correctly and advance, but get one wrong, and <span style={{ color: 'red' }}>you lose!</span> Aim for the highest score and top the leaderboard!
          </p>
          <button className="tutorial-btn" onClick={() => alert("Tutorial clicked!")}>
            Learn More
          </button>
          <div className="github">
            <a
              href="https://www.github.com/ishthefish11"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="github-icon"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>GitHub</title>
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="github-text" style={{ color: '#ffffff' }}>Visit my GitHub</span>
            </a>
          </div>
        </div>

        {/* Popups */}
        {popup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}>
                ✕
              </button>
              {popup === "profile" && (
                <div>
                  <h2>Profile</h2>
                  {loading && <p>Loading...</p>}
                  {error && <p>{error}</p>}
                  {profileData && (
                    <div className="profile-details">
                      {/* Profile Header */}
                      <div className="profile-header">
                        <div className="profile-image">
                          <img src="/path/to/avatar.png" alt="Profile Avatar" className="avatar" />
                        </div>
                        <div className="profile-info">
                          <h3 className="profile-name">{profileData.playerName}</h3>
                          <p className="profile-id">Player ID: {profileData.playerId}</p>
                        </div>
                      </div>

                      {/* Profile Statistics */}
                      <div className="profile-statistics">
                        <div className="stat-card">
                          <strong>High Score:</strong>
                          <p>{profileData.highScore}</p>
                        </div>
                        <div className="stat-card">
                          <strong>Total Games Played:</strong>
                          <p>{profileData.totalGamesPlayed}</p>
                        </div>
                        <div className="stat-card">
                          <strong>Account Created:</strong>
                          <p>{new Date(profileData.accountCreationTimestamp).toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Last Ten Scores */}
                      <div className="last-scores">
                        <h4>Last Ten Scores:</h4>
                        <div className="score-box">
                          <ul>
                            {profileData.lastTenScores && profileData.lastTenScores.length > 0 ? (
                              profileData.lastTenScores.map((score, index) => (
                                <li key={index}>Game {index + 1}: {score}</li>
                              ))
                            ) : (
                              <p>No scores available</p>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {popup === "leaderboard" && (
                <div>
                  <h2>Leaderboard</h2>
                  <p>Leaderboard data will go here. {/* Add API requests */}</p>
                </div>
              )}
              {popup === "settings" && (
                <div>
                  <h2>Settings</h2>
                  <p>Settings options will go here. {/* Add API requests */}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;