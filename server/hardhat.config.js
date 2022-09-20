require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    geroli: {
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      url: process.env.GEROLI_URL_SECRET
    }
  }
};
