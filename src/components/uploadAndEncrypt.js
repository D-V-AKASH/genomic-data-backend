import React, { useState } from "react";
import CryptoJS from "crypto-js";

// Pinata credentials
const PINATA_API_KEY = "9ef78f2acc21a3993254";
const PINATA_API_SECRET = "7f285e6bf94e22733c6c6d246f6d5406ed12910db2503e1b08e8894f1dc8d89a";

function UploadAndEncrypt() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [cid, setCid] = useState("");
  const [aesKey, setAesKey] = useState("");

  const generateAESKey = () => {
    return CryptoJS.lib.WordArray.random(32).toString();
  };

  const encryptFile = (fileContent, passphrase) => {
    const wordArray = CryptoJS.lib.WordArray.create(fileContent);
    const encrypted = CryptoJS.AES.encrypt(wordArray, passphrase).toString();
    return encrypted;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCid("");
    setAesKey("");
    setStatus("");
  };

  const uploadToPinata = async (encryptedData) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

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
    return data.IpfsHash;
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      setStatus("Reading file...");
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const passphrase = generateAESKey();
      setAesKey(passphrase);

      setStatus("Encrypting file...");
      const encrypted = encryptFile(uint8Array, passphrase);

      setStatus("Uploading encrypted file to IPFS...");
      const uploadedCid = await uploadToPinata(encrypted);

      setCid(uploadedCid);
      setStatus("Encryption and upload complete!");
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="component-container">
      <h3>Upload and Encrypt Genomic Data</h3>
      <input className="file-upload-input" type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Encrypt & Upload</button>

      {status && <p className="status-text">{status}</p>}
      {cid && (
        <div>
          <p><strong>Stored CID:</strong> <code>{cid}</code></p>
          <p><strong>AES Key:</strong> <code>{aesKey}</code></p>
          <p style={{ fontSize: "0.9em", color: "gray" }}>
            Save this AES key securely. It is required to decrypt the file.
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadAndEncrypt;
