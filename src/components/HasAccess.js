import React, { useState } from "react";

function HasAccess({ contract }) {
  const [viewerAddress, setViewerAddress] = useState("");
  const [accessStatus, setAccessStatus] = useState("");

  const checkAccess = async (e) => {
    e.preventDefault();
    if (!contract) {
      setAccessStatus("Connect wallet first");
      return;
    }
    try {
      setAccessStatus("Checking access...");
      const cleanedViewerAddress = viewerAddress.trim();
      const hasAccess = await contract.hasAccess(cleanedViewerAddress);
      setAccessStatus(hasAccess ? "Access granted" : "Access denied");
    } catch (error) {
      setAccessStatus("Error: " + error.message);
    }
  };

  return (
    <div className="component-container">
      <h3>Check Access</h3>
      <form onSubmit={checkAccess} className="form-inline">
        <input
          type="text"
          placeholder="Viewer Address"
          value={viewerAddress}
          onChange={(e) => setViewerAddress(e.target.value)}
          className="input-field"
        />
        <button type="submit">Check</button>
      </form>
      <p className="status-text">{accessStatus}</p>
    </div>
  );
}

export default HasAccess;
