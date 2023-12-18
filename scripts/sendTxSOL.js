const { getDevConnection } = require("../utils/getConnect");
const {
  SOLANA_KEYPAIR,
  RECEIVER_ADDRESS,
  LAMPORTS_PER_SOL,
} = require("../utils/config");
const { parsePair } = require("../utils/parsePair");
const { sendTransactionSOL } = require("../utils/sendTransction");

const connection = getDevConnection();
const signer = parsePair(SOLANA_KEYPAIR);

sendTransactionSOL(
  connection,
  signer,
  RECEIVER_ADDRESS,
  0.1 * LAMPORTS_PER_SOL
);
