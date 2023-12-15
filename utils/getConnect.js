const { Connection, clusterApiUrl } = require("@solana/web3.js");

const getDevConnection = () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  return connection;
};
const getTestConnection = () => {
  const connection = new Connection(clusterApiUrl("testnet"));
  return connection;
};

const getMainConnection = () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  return connection;
};
module.exports = { getDevConnection, getTestConnection, getMainConnection };
