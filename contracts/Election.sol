// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Election {

    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }

    // Maps int to candidates
    mapping(uint => Candidate) public candidates;

    // Maps Addresses to true/false
    mapping(address => bool) public voters;

    uint public candidateCount;

    uint public voterCount;

    event votedEvent(uint indexed _candidateId);

    constructor() {
        addCandidate("Winter Thomas", unicode"Waschbär Partei - ÖWP");
        addCandidate("Nenning Simon", unicode"Mathe Partei - ÖMP");
        addCandidate("Nowak Maximilian", unicode"Verteile Systeme Gruppe - VSG");
        addCandidate("Moser Christina", unicode"Weinlieber Klub - WLÖ");
    }

    function addCandidate(string memory _name, string memory _party) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _party, 0);
    }

    function vote(uint _candidateId) public {
        // Checks if voter has voted
        /* Commented out due to testing needs */
        // require(
        //     !voters[msg.sender], 
        //     "You have already voted"
        // ); 

         // Checks if candidate is in valid range
        require(
            _candidateId > 0 && _candidateId <= candidateCount,
            "Then candidate you wanted to vote for is invalid"
        );

        // register that user voted
        voters[msg.sender] = true;

        //increase the vote count
        candidates[_candidateId].voteCount++;
        voterCount++;

        emit votedEvent(_candidateId);
    }
}
