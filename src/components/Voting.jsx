import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Container from 'react-bootstrap/Container'
import { Row, Col, Form, Button } from 'react-bootstrap';

const Voting = () => {

    const [vote, setVote] = useState('');
    const candidates = ["Winter Thomas", "Nowak Maximilian", "Nenning Simon", "Moser Christina"]

    const handleVoteSelection = (event) => {
        const val = event.target.value;
        setVote(val)
        console.log(val)
    }

    useEffect(async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = await new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
    }, []);



    return (
        <>
            <Container>
                <Row style={{ marginTop: 30 }}>
                    <Col>
                        <h3> Welcome to the election </h3>
                        <p> Current Balance: X ETH</p>
                    </Col>
                </Row>
                <Form.Select onChange={handleVoteSelection} size='lg' aria-label="Default select example">
                    <option> Select a candidate to vote for </option>
                    {candidates.map((candidate) => {
                        return (
                            <option value={candidate} >{candidate}</option>
                        )
                    })}
                </Form.Select>
                <Button style={{ marginTop: 10 }}> Submit Vote </Button>
            </Container >
        </>
    )

}

export default Voting