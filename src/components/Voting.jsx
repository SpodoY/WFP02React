import { useState, useEffect } from 'react';
import { Contract, ethers, formatEther } from 'ethers';
import Container from 'react-bootstrap/Container'
import { Row, Col, Form, Button, Toast, ToastContainer, Table } from 'react-bootstrap';

const Voting = () => {

    let signer = null;
    let provider;
    let balance;
    let contract;

    //VITE_HARDHAT_CONTRACT_ADDRESS or VITE_SEPOLIA_CONTRACT_ADDRESS
    const contractAddress = import.meta.env.VITE_ARBITRUM_CONTRACT_ADDRESS

    const [accountAddress, setAccountAddress] = useState("");
    const [accBalance, setAccBalance] = useState();
    const [candidates, setCandidates] = useState([]);
    const [signerContract, setSignerContract] = useState();
    const [vote, setVote] = useState('');
    const [hasVoted, setHasVoted] = useState(false)

    // For Toast
    const [show, setShow] = useState(false)

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
        let accs;
        provider = new ethers.BrowserProvider(window.ethereum)

        accs = (await provider.listAccounts())[0]
        setAccountAddress(accs.address)

        // Needed for writing operations since provider can't do that
        signer = await provider.getSigner();

        // Get balance of current account
        balance = await provider.getBalance(accs.address)
        setAccBalance(formatEther(balance))

        /**
         * Creates a contract object with my contract address, the defined functions
         * inside the ABI and as a provider -> we can't write just read yet
         * */
        contract = new Contract(contractAddress, ABI, provider)
        setSignerContract(new Contract(contractAddress, ABI, signer));

        // Fills list of candidates from smart contract
        queryCandidates(contract)
        setHasVoted(await contract.voters(accs.address))
    }

    useEffect(async () => {

        // Connect to the Blockchain via MetaMask
        if (window.ethereum == null) {

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
            const curCandidate = await contractObject.candidates(i)
            buffer.push(curCandidate)
        }
        // Updates candidates
        setCandidates(buffer)
    }

    const handleVoteSelection = (event) => {
        setVote(candidates.find((voter) => voter.name === event.target.value))
    }

    const handleVoteSumbission = async (event) => {
        event.preventDefault();
        // Checks if the selected candidate is valid
        if (candidates.find((voter) => voter.name === vote[1]) && !hasVoted) {
            try {
                signerContract.vote(vote.id);
            } catch (error) {
                setShow(true)
                console.log(error)
            }
            balance = await provider.getBalance(accs.address)
            setAccBalance(formatEther(balance))


        } else {
            // Toast of invalid vote logic
            setShow(true)
        }
    }

    return (
        <>
            <Container>
                <Row className='mt-4'>
                    <Col>
                        <h3> Welcome to the election </h3>
                        <p> Currently voting as: {accountAddress} ETH</p>
                        <p> Current balance: {accBalance} ETH</p>
                    </Col>
                </Row>
                <Form onSubmit={handleVoteSumbission}>
                    <Form.Select onChange={handleVoteSelection} size='lg' aria-label="Default select example">
                        <option>Please choose a candidate</option>
                        {candidates ? candidates.map((candidate) => {
                            return (
                                <option value={candidate.name} >{candidate.name}</option>
                            )
                        }) : []}
                    </Form.Select>
                    <Button style={{ marginTop: 10 }} type='submit'> Submit Vote </Button>
                </Form>

                <Table>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th> Votes </th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates ? candidates
                            .sort((a, b) => (a.voteCount > b.voteCount ? -1 : 1))
                            .map((candidate) => {
                                return (
                                    <tr>
                                        <td> {candidate.id} </td>
                                        <td> {candidate.name} </td>
                                        <td> {candidate.voteCount} </td>
                                    </tr>
                                )
                            })
                            : []}
                    </tbody>
                </Table>

                <ToastContainer className='m-2' position='bottom-end'>
                    <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body className='text-white'>
                            {hasVoted ? "You have already voted" : "Your vote was invalid"}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </Container >
        </>
    )

}

export default Voting