import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Wallet = ({ balance, onSendToken }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokensToSend, setTokensToSend] = useState(0);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    // Generate a unique address for the user on component mount
    const uniqueAddress = uuidv4();
    setUserAddress(uniqueAddress);
  }, []);

  const handleSendTokens = () => {
    // Validate recipientAddress and tokensToSend
    if (recipientAddress && tokensToSend > 0) {
      onSendToken(recipientAddress, tokensToSend);
      setRecipientAddress('');
      setTokensToSend(0);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(userAddress).then(() => {
      alert('Address copied to clipboard');
    });
  };

  return (
    <div>
      <h2>Wallet</h2>
      <p>Your Balance: {balance} tokens</p>
      <div>
        <label>Your Receiving Address:</label>
        <input type="text" value={userAddress} readOnly />
        <button onClick={handleCopyAddress}>Copy Address</button>
      </div>
      <label>Recipient Address:</label>
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <label>Tokens to Send:</label>
      <input
        type="number"
        value={tokensToSend}
        onChange={(e) => setTokensToSend(parseInt(e.target.value))}
      />
      <button onClick={handleSendTokens}>Send Tokens</button>
    </div>
  );
};

export default Wallet;
