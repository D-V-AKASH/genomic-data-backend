import { useState } from "react";
import { BrowserProvider } from "ethers";
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
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const tx = await contract.storeCID(cid);
      await tx.wait();

      alert("CID uploaded successfully!");
    } catch (err) {
      console.error("Error uploading CID:", err);
      alert("Failed to upload CID");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter CID"
      />
      <button onClick={handleUpload}>Upload CID</button>
    </div>
  );
};

export default UploadCID;
