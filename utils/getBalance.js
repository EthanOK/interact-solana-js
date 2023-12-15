const { WALLET_ADDRESS, PublicKey, LAMPORTS_PER_SOL } = require("./config");
const { getDevConnection } = require("./getConnect");

const connection = getDevConnection();

async function main() {
  let balance = await connection.getBalance(new PublicKey(WALLET_ADDRESS));
  console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
}

main();
