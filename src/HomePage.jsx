import { useState, useEffect } from 'react';
import { User, Trophy, Settings, PlayCircle, } from 'lucide-react';
import s from './HomePage.module.css';
import { getPlayerInfo, getLeaderboardGames } from './utils/Helper';

function HomePage() {
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [profileData, setProfileData] = useState(null); // Add profileData state
  const [leaderboardData, setLeaderboardData] = useState(null); // Add leaderboard data state
  const [error, setError] = useState(null); // Add error state

  const handlePopup = (type) => {
    setPopup(type);
  };

  const closePopup = () => {
    setPopup(null);
  };

  // Fetch profile data when the profile popup is opened
  useEffect(() => {
    if (popup === 'profile') {
      setLoading(true);
      setError(null);
      getPlayerInfo()
        .then((data) => {
          setProfileData(data);
          setLoading(false);
          console.log(JSON.stringify(data, null, 2)); // Pretty print the JSON data
        })
        .catch((err) => {
          setError('Failed to fetch profile information.');
          setLoading(false);
        });
    }
  }, [popup]);

  // Fetch leaderboard data when the leaderboard popup is opened
  useEffect(() => {
    if (popup === 'leaderboard') {
      setLoading(true);
      setError(null);
      getLeaderboardGames()
        .then((data) => {
          setLeaderboardData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch leaderboard information.');
          setLoading(false);
        });
    }
  }, [popup]);

  return (
    
    <div className={s['animated-background']}>
      <div className={s['container']}>
        {/* <div className={s['bee-container']}>
          <div className={s['bee']}>
            <div className={s['wings']}></div>
          </div>
        </div> */}
        {/* Navigation Bar */}
        <nav className={s['navbar']}>
          <button className={s['play-btn']} onClick={() =>   window.location.href = "/play"}>
            <PlayCircle size={24} /> Play
          </button>
          <h1 className={s['title']}>Spelling Gauntlet</h1>
          <div className={s['nav-icons']}>
            <User onClick={() => handlePopup('profile')} className={s['icon']} />
            <Trophy onClick={() => handlePopup('leaderboard')} className={s['icon']} />
            <Settings onClick={() => handlePopup('settings')} className={s['icon']} />
          </div>
        </nav>

        {/* Main Content */}
        <div className={s['main-content']}>
          <h2 className={s['section-title']}>How to Play?</h2>
          <p className={s['description']}>
            Test your spelling skills in the ultimate gauntlet! <span style={{ color: 'lightgreen', fontWeight: 'bold' }}>Spell words correctly and advance,</span> but get one wrong, and <span style={{ color: 'red', fontWeight: 'bold' }}>you lose!</span> Aim for the highest score and top the leaderboard!
          </p>
          <button className={s['tutorial-btn']} onClick={() => alert('Tutorial clicked!')}>
            Learn More
          </button>
          <div className={s['github']}>
            <a
              href="https://www.github.com/ishthefish11"
              target="_blank"
              rel="noopener noreferrer"
              className={s['github-link']}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={s['github-icon']}
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
              <span className={s['github-text']} style={{ color: '#ffffff' }}>Visit my GitHub</span>
            </a>
          </div>
        </div>

        {/* Popups */}
        {popup && (
          <div className={s['popup']}>
            <div className={s['popup-content']}>
              <button className={s['close-btn']} onClick={closePopup}>
                ✕
              </button>
              {popup === 'profile' && (
                <div>
                  <h2>Profile</h2>
                  {loading && <p>Loading...</p>}
                  {error && <p>{error}</p>}
                  {profileData && (
                    <div className={s['profile-details']}>
                      {/* Profile Header */}
                      <div className={s['profile-header']}>
                        <div className={s['profile-image']}>
                          <img src="/path/to/avatar.png" alt="Profile Avatar" className={s['avatar']} />
                        </div>
                        <div className={s['profile-info']}>
                          <h3 className={s['profile-name']}>{profileData.playerName}</h3>
                          <p className={s['profile-id']}>Player ID: {profileData.playerId}</p>
                        </div>
                      </div>

                      {/* Profile Statistics */}
                      <div className={s['profile-statistics']}>
                        <div className={s['stat-card']}>
                          <strong>High Score:</strong>
                          <p>{profileData.highScore}</p>
                        </div>
                        <div className={s['stat-card']}>
                          <strong>Total Games Played:</strong>
                          <p>{profileData.totalGamesPlayed}</p>
                        </div>
                        <div className={s['stat-card']}>
                          <strong>Account Created:</strong>
                          <p>{new Date(profileData.accountCreationTimestamp).toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Last Ten Scores */}
                      <div className={s['last-scores']}>
                        <h4>Last Ten Scores:</h4>
                        <div className={s['score-box']}>
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

              {popup === 'leaderboard' && (
                <div>
                  <h2>Leaderboard</h2>
                  {loading && <p>Loading...</p>}
                  {error && <p>{error}</p>}
                  {leaderboardData && (
                    <div className={s['leaderboard']}>
                      <ul>
                        {leaderboardData.map((game, index) => (
                          <li key={index}>
                            <strong>{game.playerName}</strong>: {game.score} points
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {popup === 'settings' && (
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
