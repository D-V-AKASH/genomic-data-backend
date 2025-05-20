import React, { useState } from "react";
import { ethers } from "ethers";

function GetCID({ contract }) {
  const [ownerAddress, setOwnerAddress] = useState("");
  const [cid, setCid] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ownerAddress) {
      alert("Please enter owner wallet address");
      return;
    }

    if (!ethers.utils.isAddress(ownerAddress)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    if (!contract) {
      alert("Contract not initialized");
      return;
    }

    setCid("");
    setAesKey("");
    setStatus("Fetching data...");

    try {
      const [retrievedCid, retrievedAesKey] = await contract.getCIDandKey(ownerAddress);

      setCid(retrievedCid);
      setAesKey(retrievedAesKey);
      setStatus("Data retrieved successfully.");
    } catch (error) {
      console.error("Error fetching CID and AES key:", error);
      setStatus("Access denied or data not found.");
      setCid("");
      setAesKey("");
    }
  };

  return (
    <div>
      <h2>Get CID and AES Key</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter owner wallet address"
          value={ownerAddress}
          onChange={(e) => setOwnerAddress(e.target.value)}
        />
        <button type="submit" disabled={status === "Fetching data..."}>Get Data</button>
      </form>
      <div>
        <p><strong>CID:</strong> {cid}</p>
        <p><strong>AES Key:</strong> {aesKey}</p>
      </div>
      <p>{status}</p>
    </div>
  );
}

export default GetCID;
