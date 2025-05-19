// src/components/HasAccess.js
import React, { useState } from "react";
import { ethers } from "ethers"; // ✅ This fixes the error

function HasAccess({ signer }) {
  const [userAddress, setUserAddress] = useState("");
  const [viewerAddress, setViewerAddress] = useState("");
  const [accessStatus, setAccessStatus] = useState("");

 const checkAccess = async (e) => {
  e.preventDefault();
  if (!signer) {
    setAccessStatus("Connect wallet first");
    return;
  }
  try {
    setAccessStatus("Checking access...");
    const contractAddress = "0xc0929b5ba5aae644d42e567003a287693f795e1d";
    const abi = [
      "function hasAccess(address _user, address _viewer) public view returns (bool)"
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // ✅ Trim both addresses before using
    const cleanedUserAddress = userAddress.trim();
    const cleanedViewerAddress = viewerAddress.trim();

    const hasAccess = await contract.hasAccess(cleanedUserAddress, cleanedViewerAddress);
    setAccessStatus(hasAccess ? "Access granted" : "Access denied");
  } catch (error) {
    setAccessStatus("Error: " + error.message);
  }
};


  return (
    <div className="component-container">
      <h3>Check Access</h3>
      <form onSubmit={checkAccess} className="form-inline">
        <input
          type="text"
          placeholder="User Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Viewer Address"
          value={viewerAddress}
          onChange={(e) => setViewerAddress(e.target.value)}
          className="input-field"
        />
        <button type="submit">Check</button>
      </form>
      <p className="status-text">{accessStatus}</p>
    </div>
  );
}

export default HasAccess;
