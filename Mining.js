import React, { useState, useEffect } from 'react';
import './Mining.css'; // Import CSS for styling

const Mining = ({ onMine }) => {
  const [miningAllowed, setMiningAllowed] = useState(true);
  const [miningInProgress, setMiningInProgress] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startMining = () => {
    setMiningAllowed(false);
    setMiningInProgress(true);
    setTimeLeft(86400); // 24 hours in seconds

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // After 24 hours, allow mining again
    setTimeout(() => {
      clearInterval(timer);
      setMiningAllowed(true);
    }, 86400000); // 24 hours in milliseconds
  };

  useEffect(() => {
    if (timeLeft === 0 && miningInProgress) {
      setMiningInProgress(false);
      onMine(); // Trigger mining reward action
    }
  }, [timeLeft, miningInProgress, onMine]);

  const formattedTimeLeft = new Date(timeLeft * 1000).toISOString().substr(11, 8);
  const progress = (timeLeft / 86400) * 100; // Calculate progress percentage

  return (
    <div className="mining-container">
      <h2>Mining</h2>
      {miningAllowed ? (
        <button onClick={startMining}>Start Mining</button>
      ) : (
        <div className="mining-progress">
          <p>Mining in progress... Time left: {formattedTimeLeft}</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mining;
