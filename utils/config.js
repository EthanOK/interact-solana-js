require("dotenv").config();
const {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} = require("@solana/web3.js");

const SOLANA_KEYPAIR = process.env.SOLANA_KEYPAIR;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;

module.exports = {
  SOLANA_KEYPAIR,
  WALLET_ADDRESS,
  PublicKey,
  LAMPORTS_PER_SOL,
  Connection,
};
