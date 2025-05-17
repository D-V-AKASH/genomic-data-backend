// GetCID.js
import React, { useState } from "react";
import { BrowserProvider } from "ethers";  // Correct import for ethers v6
import { getContract } from "../utils/contract";

const GetCID = () => {
  const [userAddress, setUserAddress] = useState("");
  const [cid, setCid] = useState("");

  const handleGetCID = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Initialize provider and signer using ethers v6 syntax
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Get contract instance
      const contract = getContract(signer);

      // Call contract function
      const result = await contract.getCID(userAddress);
      setCid(result);
    } catch (error) {
      console.error("Error fetching CID:", error);
      alert("Failed to fetch CID. See console for details.");
    }
  };

  return (
    <div>
      <h2>Get CID</h2>
      <input
        type="text"
        placeholder="Enter user address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <button onClick={handleGetCID}>Get CID</button>
      {cid && (
        <div>
          <h3>CID:</h3>
          <p>{cid}</p>
        </div>
      )}
    </div>
  );
};

export default GetCID;
