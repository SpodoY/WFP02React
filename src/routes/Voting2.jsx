import { useState, useEffect } from 'react';
import { Contract, ethers, formatEther } from 'ethers';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import CandidateCard from '../components/Candidate';
import AccountInfo from '../components/Avatar';
import NavBar from '../components/NavBar';

const Voting2 = () => {

    let signer = null;
    let provider;
    let contract;

    /*
        VITE_HARDHAT_CONTRACT_ADDRESS
        VITE_ARBITRUM_CONTRACT_ADDRESS
        VITE_SEPOLIA_CONTRACT_ADDRESS
        VITE_OPTIMISM_CONTRACT_ADDRESS
     */
    const contractAddress = import.meta.env.VITE_OPTIMISM_CONTRACT_ADDRESS

    const [candidates, setCandidates] = useState([]);
    const [signerContract, setSignerContract] = useState();

    const ABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                }
            ],
            "name": "votedEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "candidateCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const handleAccountsChanged = async () => {
        provider = new ethers.BrowserProvider(window.ethereum)

        // Needed for writing operations since provider can't do that
        signer = await provider.getSigner();

        /**
         * Creates a contract object with my contract address, the defined functions
         * inside the ABI and as a provider -> we can't write just read yet
         * */
        contract = new Contract(contractAddress, ABI, provider)
        setSignerContract(new Contract(contractAddress, ABI, signer));

        // Fills list of candidates from smart contract
        queryCandidates(contract)
    }

    useEffect(async () => {
        // Connect to the Blockchain via MetaMask
        if (window.ethereum === null) {
            // If metamask is not installed, use default provider
            provider = ethers.getDefaultProvider();
        } else {
            await handleAccountsChanged()
        }

        // This tracks MetaMask account changes and then updates all values
        window.ethereum.on('accountsChanged', handleAccountsChanged);
    }, [])

    const queryCandidates = async (contractObject) => {

        // Queries how many candidates we have (4)
        const candidateAmount = await contractObject.candidateCount();

        // Needed since umm... useState shenanigangs
        let buffer = Array()

        // Adds all candidates to buffer
        for (let i = 1; i <= candidateAmount; i++) {
            buffer.push(await contractObject.candidates(i))
        }
        // Updates candidates
        setCandidates(buffer)
    }

    const handleVoteSumbission = async (id) => {
        try { await signerContract.vote(id); } 
        catch (error) { console.log(error) }
    }

    return (
        <>
            <AccountInfo size={100} />
            <Grid mt={2} sx={{width: '75%', marginX: 'auto' }} container rowSpacing={8} columnSpacing={4} >
                {candidates ? candidates.map((candidate) => {
                    return (
                        <>
                            <Grid xs={4}>
                                <CandidateCard voteFunction={handleVoteSumbission} candidateInfo={candidate} animalName={"raccoon"}/>
                            </Grid>
                        </>
                    )
                }) : []}
            </Grid>
            {/* <NavBar /> */}
        </>
    )

}

export default Voting2