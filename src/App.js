// src/App.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import ConnectWallet from "./components/ConnectWallet";
import UploadCID from "./components/UploadCID";
import UploadAndEncrypt from "./components/uploadAndEncrypt";
import GetCID from "./components/GetCID";
import GrantAccess from "./components/GrantAccess";
import RevokeAccess from "./components/RevokeAccess";
import HasAccess from "./components/HasAccess";
import DecryptFile from "./components/decrypt";

import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [signer, setSigner] = useState(null);

  // Update signer when account changes
  useEffect(() => {
    async function setupSigner() {
      if (currentAccount && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signerInstance = provider.getSigner();
          console.log("Signer set:", signerInstance);
          setSigner(signerInstance);
        } catch (error) {
          console.error("Error setting signer:", error);
          setSigner(null);
        }
      } else {
        setSigner(null);
      }
    }
    setupSigner();
  }, [currentAccount]);

  return (
    <div className="app-container">
      <h1 className="app-title">Genomic Data Access Platform</h1>

      {/* Connect Wallet Component */}
      <ConnectWallet
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      {/* Display active wallet */}
      {currentAccount && (
        <p className="account-info">
          Wallet Connected: <strong>{currentAccount}</strong>
        </p>
      )}

      {/* Main Components */}
      <div className="actions-grid">
        <UploadCID signer={signer} />
        <GetCID signer={signer} />
        <GrantAccess signer={signer} />
        <RevokeAccess signer={signer} />
        <HasAccess signer={signer} />
        <UploadAndEncrypt signer={signer} />
        <DecryptFile />
      </div>
    </div>
  );
}

export default App;
