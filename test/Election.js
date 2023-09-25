import { assert } from "chai";

describe("Election contract", () => {

    it("Get candidates after deployment", async () => {

        // Instantiate contract
        const election = await ethers.deployContract("Election");

        // Get first Candidate ... I know index is one... fck solidity
        const firstCandidate = await election.candidates(1);

        // Assert if first candidate is "Winter Thomas"
        assert.equal(firstCandidate.name, "Winter Thomas")
    });

    it("Check params of candidate", async () => {
        // Instantiate contract
        const election = await ethers.deployContract("Election");

        const testCandidate = await election.candidates(2);

        // Asserts
        assert.equal(testCandidate.name, "Nowak Maximilian", "Not the correct name")
        assert.equal(testCandidate.id, "2", "Found a different ID than expected")
        assert.equal(testCandidate.voteCount, 0, "Found a different voteCount than expected")
    });

    it("Cast vote", async () => {

        // Instantiate contract
        const election = await ethers.deployContract("Election");
        const candidateID = 2;

        await election.vote(candidateID);

        const votedPerson = election.voters()
        const testCandidate = await election.candidates(candidateID);

        // Asserts
        assert.equal(testCandidate.voteCount, 1, "Found a different voteCount than expected")

    })
});