import React, { useState } from "react";
import { ethers } from "ethers";

function GetCID({ signer }) {
  const [userAddress, setUserAddress] = useState("");
  const [cid, setCid] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCID = async (e) => {
    e.preventDefault();
    setCid("");
    setErrorMsg("");

    if (!signer) {
      setErrorMsg("Connect wallet first");
      return;
    }

    try {
      const contractAddress = "0xc0929b5ba5aae644d42e567003a287693f795e1d";
      const abi = [
        "function getCID(address _user) public view returns (string memory)"
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const fetchedCID = await contract.getCID(userAddress);

      if (!fetchedCID || fetchedCID.trim() === "") {
        setErrorMsg("No CID found or access denied.");
      } else {
        setCid(fetchedCID);
      }
    } catch (error) {
      if (
        error.message.includes("resolver or addr is not configured for ENS name") ||
        error.code === "INVALID_ARGUMENT"
      ) {
        setErrorMsg("Access denied or no data available for this address.");
      } else {
        setErrorMsg("Error fetching CID: " + error.message);
      }
    }
  };

  return (
    <div className="component-container">
      <h3>Get CID</h3>
      <form onSubmit={fetchCID} className="form-inline">
        <input
          type="text"
          placeholder="Enter user address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          className="input-field"
        />
        <button type="submit">Get CID</button>
      </form>
      {cid && <p><strong>CID:</strong> {cid}</p>}
      {errorMsg && <p className="status-text">{errorMsg}</p>}
    </div>
  );
}

export default GetCID;
