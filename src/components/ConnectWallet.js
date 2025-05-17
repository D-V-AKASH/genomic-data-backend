// src/components/ConnectWallet.js
import React from "react";

const ConnectWallet = ({ setCurrentAccount }) => {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <button onClick={connectWallet}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
