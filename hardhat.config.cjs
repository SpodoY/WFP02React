require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");
require("ethers")

const { INFURA_API_KEY, MNEMONIC } = process.env

// Transaction Hash: 0xedc6a42b5e38a50137d392907580ca8f069f6ef9894c3d1935511a9386413971
// Link for Transaction: https://sepolia.etherscan.io/tx/0xedc6a42b5e38a50137d392907580ca8f069f6ef9894c3d1935511a9386413971

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    },
    arbitrum_goerli: {
      url: `https://arbitrum-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    },
    optimism_goerli: {
      url: `https://optimism-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    }
  },

  // To run specific network type: "npx hardhat test --network <some network defined above>"
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false,
    currency: 'EUR',
    noColors: true,
    outputFile: "gas-report-hre.txt",
    coinmarketcap: process.env.COINMAKERKET_API_KEY
  }
};
