// src/contract.js

import { Contract } from "ethers"; // ✅ Correct import for ethers v6

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xc0929b5ba5aae644d42e567003a287693f795e1d";

// ABI of the GenomicDataAccess contract
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "string", "name": "_cid", "type": "string" }],
    "name": "storeCID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "getCID",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" },
      { "internalType": "address", "name": "_viewer", "type": "address" }
    ],
    "name": "hasAccess",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// 🔧 Export a helper function to get the contract instance
export const getContract = (signer) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
