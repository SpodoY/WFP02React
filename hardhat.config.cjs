require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

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
    arbitrum_goerli:
    {
      url: `https://arbitrum-goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MNEMONIC]
    }

  }
};
