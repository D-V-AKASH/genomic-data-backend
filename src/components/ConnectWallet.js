// src/components/ConnectWallet.js
import React from "react";

const ConnectWallet = ({ setCurrentAccount }) => {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set the current selected account
      setCurrentAccount(accounts[0]);

      // Optional: listen for account changes AFTER connection
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        } else {
          setCurrentAccount(null);
        }
      });
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <div className="connect-wallet">
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default ConnectWallet;
