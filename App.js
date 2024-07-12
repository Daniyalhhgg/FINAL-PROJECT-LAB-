// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Mining from './Mining';
import Wallet from './Wallet';
import Profile from './Profile';
import KYC from './KYC';
import './App.css'; // Import CSS for styling

const App = () => {
  const [balance, setBalance] = useState(0);

  const handleMine = () => {
    // Reward the user with 1 token after mining completes
    setBalance((prevBalance) => prevBalance + 1);
  };

  const handleSendToken = (recipientAddress, tokens) => {
    // Implement token transfer logic here (e.g., update balances)
    console.log(`Sending ${tokens} tokens to ${recipientAddress}`);
    // Example: Update balance for recipient and sender
  };

  // Dummy profile data for initial state
  const initialUserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    country: 'Select Country',
    description: '',
    phone: ''
  };

  // State to manage user profile data
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  // Handler to update user profile
  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    // Optional: Add logic to save updated profile data (e.g., API call)
  };

  return (
    <Router>
      <div className="app-container">
        <h1>Pi Network Simulation</h1>
        <Navigation />
        <Routes>
          <Route path="/mining" element={<Mining onMine={handleMine} />} />
          <Route path="/wallet" element={<Wallet balance={balance} onSendToken={handleSendToken} />} />
          <Route path="/profile" element={<Profile userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/" element={<div>Welcome to Pi Network Simulation. Select an option to proceed.</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
