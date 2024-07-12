// src/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Optional: Add CSS for styling

const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/mining"><button>Mining</button></Link>
      <Link to="/kyc"><button>KYC</button></Link>
      <Link to="/profile"><button>Profile</button></Link>
      <Link to="/wallet"><button>Wallet</button></Link>
    </div>
  );
};

export default Navigation;
