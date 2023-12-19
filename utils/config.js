require("dotenv").config();
const {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} = require("@solana/web3.js");

const SOLANA_KEYPAIR = process.env.SOLANA_KEYPAIR;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_ADDRESS1 = "AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z";

const RECEIVER_ADDRESS = "3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH";

module.exports = {
  SOLANA_KEYPAIR,
  WALLET_ADDRESS,
  RECEIVER_ADDRESS,
  PublicKey,
  LAMPORTS_PER_SOL,
  WALLET_ADDRESS1,
  Connection,
};
