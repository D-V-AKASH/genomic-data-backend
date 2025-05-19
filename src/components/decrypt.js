import React, { useState } from "react";
import CryptoJS from "crypto-js";

function DecryptFile() {
  const [cid, setCid] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [decryptedContent, setDecryptedContent] = useState("");
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchEncryptedFile = async (cid) => {
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from IPFS: ${response.statusText}`);
    }
    return await response.text(); // Encrypted data is text
  };

  const decryptAES = (encryptedData, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        throw new Error("Invalid AES key or corrupted data");
      }
      return decryptedText;
    } catch (err) {
      throw new Error("Decryption failed: " + err.message);
    }
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();
    setStatus("");
    setErrorMsg("");
    setDecryptedContent("");

    if (!cid || !aesKey) {
      setErrorMsg("Please enter both CID and AES key.");
      return;
    }

    try {
      setStatus("Fetching encrypted data...");
      const encryptedData = await fetchEncryptedFile(cid);

      setStatus("Decrypting...");
      const decrypted = decryptAES(encryptedData, aesKey);

      setDecryptedContent(decrypted);
      setStatus("Decryption successful!");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const downloadDecrypted = () => {
    const blob = new Blob([decryptedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "decrypted-genomic-data.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="component-container">
      <h3>Decrypt Genomic Data</h3>
      <form onSubmit={handleDecrypt}>
        <input
          type="text"
          placeholder="Enter CID"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter AES Key"
          value={aesKey}
          onChange={(e) => setAesKey(e.target.value)}
          className="input-field"
        />
        <button type="submit">Decrypt</button>
      </form>

      {status && <p className="status-text">{status}</p>}
      {errorMsg && <p className="error-text">{errorMsg}</p>}

      {decryptedContent && (
        <div>
          <h4>Decrypted Content:</h4>
          <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f3f3f3", padding: "10px" }}>
            {decryptedContent}
          </pre>
          <button onClick={downloadDecrypted}>Download Decrypted File</button>
        </div>
      )}
    </div>
  );
}

export default DecryptFile;
