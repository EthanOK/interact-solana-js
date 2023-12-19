const {
  WALLET_ADDRESS,
  PublicKey,
  LAMPORTS_PER_SOL,
} = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { getNativeBalance } = require("../utils/getNativeBalance");

const connection = getDevConnection();

async function main() {
  let balance = await getNativeBalance(connection, WALLET_ADDRESS);
  console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
}

main();
