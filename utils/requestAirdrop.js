const SOLANA = require("@solana/web3.js");
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;
const connection = new Connection(clusterApiUrl("devnet"));
const WALLET_ADDRESS = "3c5MLawkv9DY4C4zh39xHMic8MCTfBLVEZRSG4cWjjiH";
const AIRDROP_AMOUNT = 2 * LAMPORTS_PER_SOL; // 1 SOL

async function main() {
  console.log(`Requesting airdrop ${AIRDROP_AMOUNT} for ${WALLET_ADDRESS}`);
  const signature = await connection.requestAirdrop(
    new PublicKey(WALLET_ADDRESS),
    AIRDROP_AMOUNT
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  await connection.confirmTransaction(
    {
      blockhash,
      lastValidBlockHeight,
      signature,
    },
    "finalized"
  );
  console.log(
    `Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
}

main();
