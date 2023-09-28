// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const election = await ethers.deployContract("Election");
await election.waitForDeployment();

console.log(
  `Election deployed to ${election.target}`
)

// Command to run for local deploy:
// npx hardhat run --network localhost .\scripts\deploy.js

// Command to run for sepolia deploy:
// npx hardhat run --network sepolia .\scripts\sepoliaDeploy.js