require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");
require("ethers")

const { INFURA_API_KEY, MNEMONIC, REPORT_GAS, COINMAKERKET_API_KEY } = process.env

/**
 * Transaction Sites
 * Strk: https://testnet-2.starkscan.co/
 * Arbi: https://goerli.arbiscan.io/
 * OP: https://goerli-optimism.etherscan.io/
 */

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  mocha: {
    timeout: 180000
  },
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC],
    },
    arbitrum_goerli: {
      url: `https://arbitrum-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    },
    arbitrum_sepolia: {
      url: `https://arbitrum-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    },
    optimism_goerli: {
      url: `https://optimism-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    },
    optimism_sepolia: {
      url: `https://optimism-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    },
    starknet_goerli: {
      url: `https://starknet-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    }
  },

  // To run specific network type: "npx hardhat test --network <some network defined above>"
  gasReporter: {
    enabled: (REPORT_GAS) ? true : false,
    currency: 'EUR',
    noColors: true,
    outputFile: "gas-report.txt",
    coinmarketcap: COINMAKERKET_API_KEY
  }
};
