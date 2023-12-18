const {
  WALLET_ADDRESS,
  LAMPORTS_PER_SOL,
  PublicKey,
} = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const connection = getDevConnection();

const AIRDROP_AMOUNT = 2 * LAMPORTS_PER_SOL; // 2 SOL

async function main() {
  console.log(
    `Requesting airdrop ${
      AIRDROP_AMOUNT / LAMPORTS_PER_SOL
    } SOL for ${WALLET_ADDRESS}`
  );
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
