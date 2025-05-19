// src/components/GrantAccess.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

const GrantAccess = () => {
  const [address, setAddress] = useState("");
  const [txStatus, setTxStatus] = useState("");

  const handleGrantAccess = async () => {
    if (!address) return alert("Please enter an address");

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); // ✅ FIXED: no await

      const contract = getContract(signer);

      setTxStatus("Sending transaction...");
      const tx = await contract.grantAccess(address);
      await tx.wait();

      setTxStatus("Access granted successfully!");
      setAddress("");
    } catch (error) {
      console.error("Error granting access:", error);
      setTxStatus("Failed to grant access. See console for details.");
    }
  };

  return (
    <div className="component-container">
      <h3>Grant Access</h3>
      <input
        type="text"
        placeholder="Enter address to grant access"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input-field"
      />
      <button onClick={handleGrantAccess}>Grant Access</button>
      {txStatus && <p className="status-text">{txStatus}</p>}
    </div>
  );
};

export default GrantAccess;
