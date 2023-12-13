const SOLANA = require("@solana/web3.js");
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;
const connection = new Connection(clusterApiUrl("devnet"));
const WALLET_ADDRESS = "3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH";

async function main() {
  let balance = await connection.getBalance(new PublicKey(WALLET_ADDRESS));
  console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
}

main();
