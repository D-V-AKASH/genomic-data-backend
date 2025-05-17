import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";  // v6 import
import ConnectWallet from "./components/ConnectWallet";
import UploadCID from "./components/UploadCID";
import GetCID from "./components/GetCID";
import GrantAccess from "./components/GrantAccess";
import RevokeAccess from "./components/RevokeAccess";
import HasAccess from "./components/HasAccess";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (currentAccount) {
      // ethers v6 provider and signer
      const provider = new BrowserProvider(window.ethereum);
      provider.getSigner().then(setSigner);
    } else {
      setSigner(null);
    }
  }, [currentAccount]);

  return (
    <div>
      <ConnectWallet setCurrentAccount={setCurrentAccount} />
      {currentAccount && <p>Your wallet is connected: {currentAccount}</p>}

      {signer && (
        <>
          <UploadCID signer={signer} />
          <GetCID signer={signer} />
          <GrantAccess signer={signer} />
          <RevokeAccess signer={signer} />
          <HasAccess signer={signer} />
        </>
      )}
    </div>
  );
}

export default App;
