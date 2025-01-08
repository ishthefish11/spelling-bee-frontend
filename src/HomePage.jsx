// HomePage.jsx - Main Content File
import { useState } from 'react';
import { User, Trophy, Settings, PlayCircle } from 'lucide-react';
import './HomePage.css';

function HomePage() {
  const [popup, setPopup] = useState(null);

  const handlePopup = (type) => {
    setPopup(type);
  };

  const closePopup = () => {
    setPopup(null);
  };

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
                  <p>Profile information will go here. {/* Add API requests */}</p>
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
