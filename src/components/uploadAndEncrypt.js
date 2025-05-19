import React, { useState } from "react";
import { ethers } from "ethers";

// AES encryption using CryptoJS (you need to install: npm install crypto-js)
import CryptoJS from "crypto-js";

// Replace with your contract address & ABI method for storing CID
const contractAddress = "0xc0929b5ba5aae644d42e567003a287693f795e1d";
const contractABI = [
  "function storeCID(string memory _cid) public"
];

// Replace with your Pinata API details
const PINATA_API_KEY = "9ef78f2acc21a3993254";
const PINATA_API_SECRET = "7f285e6bf94e22733c6c6d246f6d5406ed12910db2503e1b08e8894f1dc8d89a";

function UploadAndEncrypt({ signer }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [cid, setCid] = useState("");

  // Encrypt file content (Uint8Array) using AES with passphrase
  const encryptFile = (fileContent, passphrase) => {
    const wordArray = CryptoJS.lib.WordArray.create(fileContent);
    const encrypted = CryptoJS.AES.encrypt(wordArray, passphrase).toString();
    return encrypted;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCid("");
    setStatus("");
  };

  const uploadToPinata = async (encryptedData) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    // Pinata expects a FormData with the file as a Blob
    const blob = new Blob([encryptedData], { type: "text/plain" });
    const formData = new FormData();
    formData.append("file", blob, "encrypted-genomic-data.txt");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.IpfsHash; // This is the CID
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    if (!signer) {
      alert("Connect your wallet first.");
      return;
    }

    try {
      setStatus("Reading file...");
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // You can set your own encryption key/passphrase here or ask user for one
      const passphrase = "supersecretkey";

      setStatus("Encrypting file...");
      const encrypted = encryptFile(uint8Array, passphrase);

      setStatus("Uploading encrypted file to IPFS...");
      const uploadedCid = await uploadToPinata(encrypted);

      setStatus("Saving CID to blockchain...");
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.storeCID(uploadedCid);
      await tx.wait();

      setCid(uploadedCid);
      setStatus("Upload and store successful!");
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="component-container">
      <h3>Upload and Encrypt Genomic Data</h3>
      <input class="file-upload-input" type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Encrypt & Upload</button>
      {status && <p className="status-text">{status}</p>}
      {cid && <p>Stored CID: <code>{cid}</code></p> }
    </div>
  );
}

export default UploadAndEncrypt;
