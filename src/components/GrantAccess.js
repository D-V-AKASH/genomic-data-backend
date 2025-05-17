// GrantAccess.js
import React, { useState } from "react";
import { BrowserProvider } from "ethers"; // ✅ Ethers v6
import { getContract } from "../utils/contract";

const GrantAccess = () => {
  const [address, setAddress] = useState("");
  const [txStatus, setTxStatus] = useState("");

  const handleGrantAccess = async () => {
    if (!address) return alert("Please enter an address");

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum); // ✅ v6
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      setTxStatus("Sending transaction...");
      const tx = await contract.grantAccess(address);
      await tx.wait();

      setTxStatus("Access granted successfully!");
      setAddress("");
    } catch (error) {
      console.error("Error granting access:", error);
      setTxStatus("Failed to grant access. See console for details.");
    }
  };

  return (
    <div>
      <h2>Grant Access</h2>
      <input
        type="text"
        placeholder="Enter address to grant access"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleGrantAccess}>Grant Access</button>
      <p>{txStatus}</p>
    </div>
  );
};

export default GrantAccess;
