import { useState, useEffect } from "react";
import { Contract, ethers, formatEther } from "ethers";
import { useNavigate } from "react-router-dom";

import AccountInfo from "../components/Avatar";
import NavBar from "../components/NavBar";

import {
  Stack,
  Typography,
  Button,
  Container,
  RadioGroup,
} from "@mui/material";
import { HowToVote } from "@mui/icons-material";
import CandidatePicker from "../components/CandidatePicker";
import ElectionSol from "../artifacts/contracts/Election.sol/Election.json";

const Voting2 = ({ contract_address }) => {
  let signer = null;
  let provider;
  let contract;

  const navigate = useNavigate();

  /*
        VITE_HARDHAT_CONTRACT_ADDRESS
        VITE_ARBITRUM_CONTRACT_ADDRESS
        VITE_SEPOLIA_CONTRACT_ADDRESS
        VITE_OPTIMISM_CONTRACT_ADDRESS
     */
  //TODO: CHANGE CONTRACT ADDRESS TO Global Var. so it works for all sub-pages
  const contractAddress = contract_address;

  const [candidates, setCandidates] = useState([]);
  const [signerContract, setSignerContract] = useState();

  const handleAccountsChanged = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);

    // Needed for writing operations since provider can't do that
    signer = await provider.getSigner();

    /**
     * Creates a contract object with my contract address, the defined functions
     * inside the ABI and as a provider -> we can't write just read yet
     * */
    contract = new Contract(contractAddress, ElectionSol.abi, provider);
    setSignerContract(new Contract(contractAddress, ElectionSol.abi, signer));

    // Fills list of candidates from smart contract
    queryCandidates(contract);
  };

  useEffect(async () => {
    // Connect to the Blockchain via MetaMask
    if (window.ethereum === null) {
      // If metamask is not installed, use default provider
      provider = ethers.getDefaultProvider();
    } else {
      await handleAccountsChanged();
    }

    // This tracks MetaMask account changes and then updates all values
    window.ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);

  const queryCandidates = async (contractObject) => {
    // Queries how many candidates we have (4)
    const candidateAmount = await contractObject.candidateCount();

    // Needed since umm... useState shenanigangs
    let buffer = Array();

    // Adds all candidates to buffer
    for (let i = 1; i <= candidateAmount; i++) {
      buffer.push(await contractObject.candidates(i));
    }
    // Updates candidates
    setCandidates(buffer);
  };

  const handleVoteSumbission = async (event) => {
    event.preventDefault()
    const votedCandidateId = event.target.candidates.value
    console.log(votedCandidateId)

    try {
      const voteTransaction = await signerContract.vote(votedCandidateId);
      const voteResult = await voteTransaction.wait();
      // console.log(voteResult) // For debugging
      navigate("/results");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <Stack direction="row" justifyContent={"space-around"}>
        <p>
          <Typography align="center" variant="h4" fontWeight={"bold"}>
            {" "}
            Elektronischer{" "}
          </Typography>
          <Typography align="center" variant="h4" fontWeight={"bold"}>
            {" "}
            Stimmzettel für die{" "}
          </Typography>
          <Typography align="center" variant="h4" fontWeight={"bold"}>
            {" "}
            Wahl 2023{" "}
          </Typography>
        </p>
        <AccountInfo size={100} />
      </Stack>
      <Container component="form" onSubmit={handleVoteSumbission}>
        {/* <FormLabel> Candidates </FormLabel> */}
        <RadioGroup name="candidates">
          {candidates
            ? candidates.map(({ name, party, id }) => {
                console.log(name, party);
                return <CandidatePicker name={name} party={party} id={id} />;
              })
            : []}
        </RadioGroup>
        <Button
          type="submit"
          variant="contained"
          endIcon={<HowToVote />}
        >
          Wählen
        </Button>
      </Container>

      {/* <Grid mt={2} sx={{width: '75%', marginX: 'auto' }} container rowSpacing={8} columnSpacing={4} >
                {candidates ? candidates.map((candidate) => {
                    return (
                        <>
                            <Grid xs={4}>
                                <CandidateCard voteFunction={handleVoteSumbission} candidateInfo={candidate} animalName={"raccoon"}/>
                            </Grid>
                        </>
                    )
                }) : []}
            </Grid> */}
    </>
  );
};

export default Voting2;
