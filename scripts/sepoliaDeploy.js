const main = async () => {

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const election = await ethers.deployContract("Election");
    await election.waitForDeployment();

    console.log(`Election address: ${await election.getAddress()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// Command to run for remote deploy:
// npx hardhat run scripts/sepoliaDeploy.js --network sepolia