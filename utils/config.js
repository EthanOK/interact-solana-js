require("dotenv").config();
const {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} = require("@solana/web3.js");

const SOLANA_KEYPAIR = process.env.SOLANA_KEYPAIR;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const SOLANA_KEYPAIR1 = process.env.SOLANA_KEYPAIR_1;
const WALLET_ADDRESS1 = process.env.WALLET_ADDRESS_1;
const SOLANA_DEV_RPC = process.env.SOLANA_DEV_RPC;

const RECEIVER_ADDRESS = "3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH";

module.exports = {
  SOLANA_KEYPAIR,
  WALLET_ADDRESS,
  RECEIVER_ADDRESS,
  PublicKey,
  LAMPORTS_PER_SOL,
  WALLET_ADDRESS1,
  Connection,
  SOLANA_KEYPAIR1,
  SOLANA_DEV_RPC,
};
