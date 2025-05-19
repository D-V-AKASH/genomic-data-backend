import React, { useState } from "react";
import { ethers } from "ethers"; // ✅ Add this line

function RevokeAccess({ signer }) {
  const [address, setAddress] = useState("");
  const [txStatus, setTxStatus] = useState("");

  const handleRevoke = async (e) => {
    e.preventDefault();
    if (!signer) {
      setTxStatus("Connect wallet first");
      return;
    }
    try {
      setTxStatus("Sending transaction...");
      const contractAddress = "0xc0929b5ba5aae644d42e567003a287693f795e1d";
      const abi = [
        "function revokeAccess(address _user) public"
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.revokeAccess(address);
      await tx.wait();
      setTxStatus("Access revoked successfully!");
      setAddress("");
    } catch (error) {
      setTxStatus("Error: " + error.message);
    }
  };

  return (
    <div className="component-container">
      <h3>Revoke Access</h3>
      <form onSubmit={handleRevoke} className="form-inline">
        <input
          type="text"
          placeholder="Enter address to revoke access"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input-field"
        />
        <button type="submit">Revoke Access</button>
      </form>
      <p className="status-text">{txStatus}</p>
    </div>
  );
}

export default RevokeAccess;
