import { useState, useEffect } from "react";
import { Contract, ethers } from "ethers";

import { BarChart } from "@mui/x-charts/BarChart";
import AccountInfo from "../components/Avatar";
import { cheerfulFiestaPalette } from "@mui/x-charts";

const Result = ({contract_address}) => {
  const [dataSet, setDataSet] = useState([]);

  const contractAddress = contract_address;

  const ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "_candidateId",
          type: "uint256",
        },
      ],
      name: "votedEvent",
      type: "event",
    },
    {
      inputs: [],
      name: "candidateCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "candidates",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "voteCount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_candidateId",
          type: "uint256",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "voters",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const handleAccountsChanged = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum);

    /**
     * Creates a contract object with my contract address, the defined functions
     * inside the ABI and as a provider -> we can't write just read yet
     * */
    let contract = new Contract(contractAddress, ABI, provider);

    // Fills list of candidates from smart contract
    queryCandidates(contract);
  };

  const queryCandidates = async (contractObject) => {
    // Queries how many candidates we have (4)
    const candidateAmount = await contractObject.candidateCount();

    // Needed since umm... useState shenanigangs
    let newDataSet = [];

    // Adds all candidates to buffer
    for (let i = 1; i <= candidateAmount; i++) {
      const curCandidate = await contractObject.candidates(i);
      newDataSet.push({
        candidate: curCandidate.name,
        votes: Number(BigInt(curCandidate.voteCount)),
      });
    }
    // Updates dataset
    console.log(newDataSet);
    setDataSet(newDataSet);
  };

  useEffect(async () => {
    // Connect to the Blockchain via MetaMask
    if (window.ethereum == null) {
      // If metamask is not installed, use default provider
      provider = ethers.getDefaultProvider();
    } else {
      await handleAccountsChanged();
    }

    // This tracks MetaMask account changes and then updates all values
    window.ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);

  return (
    <>
      <AccountInfo size={100} />
      <BarChart
        sx={{ width: "100%" }}
        dataset={dataSet.length !== 0 ? dataSet : [{}]}
        colors={cheerfulFiestaPalette}
        xAxis={[{ dataKey: "candidate", scaleType: "band" }]}
        series={[{ dataKey: "votes" }]}
        height={300}
      />
    </>
  );
};

export default Result;
