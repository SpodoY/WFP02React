import { useState, useEffect } from "react";
import { Contract, ethers } from "ethers";

import { BarChart } from "@mui/x-charts/BarChart";
import AccountInfo from "../components/Avatar";
import NavBar from "../components/NavBar";
import { cheerfulFiestaPalette } from "@mui/x-charts";
import ElectionSol from "../artifacts/contracts/Election.sol/Election.json";
import { Container } from "@mui/material";

const Result = ({ contract_address }) => {
  const [dataSet, setDataSet] = useState([]);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = contract_address;

  const ABI = ElectionSol.abi;

  const handleAccountsChanged = async () => {
    // SANITY CHECK
    let metaProv = new ethers.BrowserProvider(window.ethereum);
    let rpcProv = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

    console.log("Metamask Prov");
    console.log(await metaProv.getNetwork());
    console.log("URL Prov");
    console.log(await rpcProv.getNetwork());
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
        data: [Number(BigInt(curCandidate.voteCount))],
        label: curCandidate.name,
      });
    }
    // Updates dataset
    console.log(newDataSet);
    setDataSet(newDataSet);
  };

  useEffect(async () => {
    queryCandidates(contract);
  }, [contract]);

  useEffect(async () => {
    // Checks if MetaMask is installed and either connects via MetaMask or fallback
    if (window.ethereum) {
      // This tracks MetaMask account changes and then updates all values
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Get permission to query accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Browser provider from MetaMask's provider
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(browserProvider);

      /**
       * Creates a contract object with my contract address, the defined functions
       * inside the ABI and as a provider -> we can't write just read yet
       * */
      setContract(new Contract(contractAddress, ABI, browserProvider));
    } else {
      // Since MetaMask is not installed try default provider
      setProvider(ethers.getDefaultProvider());
    }
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  useEffect(async () => {
    if (provider && contract) {
      const eventFilter = contract.filters.votedEvent();

      const eventListener = async () => {
        const events = await contract.queryFilter(eventFilter);
        queryCandidates(contract);
        console.log("Voted Events: ", events);
      };

      contract.on(eventFilter, eventListener);

      return () => {
        contract.off(eventFilter, eventListener);
      };
    }
  }, [provider, contract]);

  return (
    <>
      <NavBar />
      <AccountInfo size={100} />
      <Container>
        <BarChart
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' }
            },
          }}
          sx={{ width: "100%" }}
          series = {dataSet}
          colors={cheerfulFiestaPalette}
          height={400}
          
        />
      </Container>
    </>
  );
};

export default Result;
