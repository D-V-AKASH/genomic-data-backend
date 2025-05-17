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
      const contractAddress = "0xc0929b5ba5aae644d42e567003a287693f795e1d"; // ✅ Already correct
      const abi = [
        "function hasAccess(address _user, address _viewer) public view returns (bool)"
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const hasAccess = await contract.hasAccess(userAddress, viewerAddress);
      setAccessStatus(hasAccess ? "Access granted" : "Access denied");
    } catch (error) {
      setAccessStatus("Error: " + error.message);
    }
  };

  return (
    <div>
      <h3>Check Access</h3>
      <form onSubmit={checkAccess}>
        <input
          type="text"
          placeholder="User Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Viewer Address"
          value={viewerAddress}
          onChange={(e) => setViewerAddress(e.target.value)}
          style={{ width: "300px" }}
        />
        <button type="submit">Check</button>
      </form>
      <p>{accessStatus}</p>
    </div>
  );
}

export default HasAccess;
