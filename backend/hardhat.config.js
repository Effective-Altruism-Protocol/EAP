require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


// Configuration
/*
  solidity - The version of solidity compiler
  defaultNetwork - The Default network to run (Without running --network-name)
  networks - Object which contains the network information
  etherscan - Object to fill in EtherScan Information for contract verification
*/
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "amoy",
  networks: {
    goerli: {
      url: process.env.QUICKNODE_GOERLI_HTTP_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    amoy: {
      url: process.env.QUICKNODE_AMOY_HTTP_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
