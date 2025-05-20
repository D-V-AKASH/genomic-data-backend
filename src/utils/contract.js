import { Contract } from "ethers";

const CONTRACT_ADDRESS = "0x71ee128427680168da1f7238ed0f89dbd07ba066";

const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_cid", type: "string" },
      { internalType: "string", name: "_aesKey", type: "string" }
    ],
    name: "storeCIDandKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getCIDandKey",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "string", name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_viewer", type: "address" }],
    name: "grantAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_viewer", type: "address" }],
    name: "revokeAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "hasAccess",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

export const getContract = (signer) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
