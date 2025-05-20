import React, { useState } from "react";

function UploadCID({ contract }) {
  const [cid, setCid] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cid || !aesKey) {
      alert("Please enter both CID and AES key");
      return;
    }
    if (!contract) {
      alert("Contract not initialized. Please connect your wallet.");
      return;
    }

    try {
      setStatus("Submitting...");

      // Call contract method with strings, no conversion needed
      const tx = await contract.storeCIDandKey(cid, aesKey);
      await tx.wait();

      setStatus("CID and AES key stored successfully!");
      setCid("");
      setAesKey("");
    } catch (err) {
      console.error("Error uploading CID and key:", err);
      setStatus("Error storing data");
    }
  };

  return (
    <div>
      <h2>Upload CID and AES Key</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CID:</label>
          <input
            type="text"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            placeholder="Enter IPFS CID"
          />
        </div>
        <div>
          <label>AES Key:</label>
          <input
            type="text"
            value={aesKey}
            onChange={(e) => setAesKey(e.target.value)}
            placeholder="Enter AES key"
          />
        </div>
        <button type="submit">Store</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default UploadCID;
