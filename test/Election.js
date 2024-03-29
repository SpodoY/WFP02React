import { assert } from "chai";
describe("Election contract", () => {

    let contract;

    // beforeEach(async () => {
    //     contract = await ethers.deployContract("Election");
    //     await contract.waitForDeployment();
    // })

    // it("Get candidates after deployment", async () => {

    //     // Get first Candidate ... I know index is one... fck solidity
    //     const firstCandidate = await contract.candidates(1);

    //     // Assert if first candidate is "Winter Thomas"
    //     assert.equal(firstCandidate.name, "Winter Thomas")
    // });

    // it("Check params of candidate", async () => {

    //     const testCandidate = await contract.candidates(2);

    //     // Asserts
    //     assert.equal(testCandidate.name, "Nowak Maximilian", "Not the correct name")
    //     assert.equal(testCandidate.id, "2", "Found a different ID than expected")
    //     assert.equal(testCandidate.voteCount, 0, "Found a different voteCount than expected")
    // });

    it("Cast vote", async () => {
        try {
            console.log("Deploying contract")
            contract = await ethers.deployContract("Election");
            console.log("Waiting for deployment")
            await contract.waitForDeployment();
            console.log("Deployed contract")

            const candidateID = 2;

            console.log("Voting")
            await contract.vote(candidateID);

            // const votedPerson = contract.voters()
            console.log("Checking candidate")
            const testCandidate = await contract.candidates(candidateID);

            // Asserts
            assert.equal(testCandidate.voteCount, 1, "Found a different voteCount than expected")
        } catch (e) {
            console.log(e)
        }
    })
});