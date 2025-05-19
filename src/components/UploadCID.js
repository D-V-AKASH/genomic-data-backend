import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

const UploadCID = () => {
  const [cid, setCid] = useState("");

  const handleUpload = async () => {
    if (!cid) return alert("Please enter a CID");

    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); // ✅ FIXED
      const contract = getContract(signer);

      const tx = await contract.storeCID(cid);
      await tx.wait();

      alert("CID uploaded successfully!");
      setCid("");
    } catch (err) {
      console.error("Error uploading CID:", err);
      alert("Failed to upload CID");
    }
  };

  return (
    <div className="component-container">
      <h3>Upload CID</h3>
      <input
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter CID"
        className="upload-input"
      />
      <button onClick={handleUpload}>Upload CID</button>
    </div>
  );
};

export default UploadCID;
