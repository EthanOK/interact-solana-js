const {
  getAssociatedTokenAddress,
  NATIVE_MINT,
  createAssociatedTokenAccountInstruction,
  createSyncNativeInstruction,
  getAccount,
} = require("@solana/spl-token");
const {
  WALLET_ADDRESS,
  PublicKey,
  LAMPORTS_PER_SOL,
  SOLANA_KEYPAIR,
} = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { parsePair } = require("../utils/parsePair");
const { convertWrappedSOL } = require("../utils/sendTransction");
const signer = parsePair(SOLANA_KEYPAIR);
const connection = getDevConnection();

async function main() {
  await convertWrappedSOL(connection, signer, LAMPORTS_PER_SOL);
}

main();
