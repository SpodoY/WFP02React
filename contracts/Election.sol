// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Truffle Console: Election.deployed().then((i) => {app = i})
// Get First Candidate: app.candidates(1).then(c => {can = c})

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Maps int to candidates
    mapping(uint => Candidate) public candidates;

    // Maps Addresses to true/false
    mapping(address => bool) public voters;

    uint public candidateCount;

    event votedEvent(uint indexed _candidateId);

    constructor() {
        addCandidate("Winter Thomas");
        addCandidate("Nowak Maximilian");
        addCandidate("Nenning Simon");
        addCandidate("Moser Christina");
    }

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender]); // Checks if voter has voted
        require(_candidateId > 0 && _candidateId <= candidateCount); // Checks if candidate is in valid range

        // register that user voted
        voters[msg.sender] = true;

        //increase the vote count
        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}
