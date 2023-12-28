const {
  WALLET_ADDRESS,
  PublicKey,
  LAMPORTS_PER_SOL,
  WALLET_ADDRESS1,
} = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { getNativeBalance } = require("../utils/getNativeBalance");
const { getBalance } = require("../utils/postRequest");

const connection = getDevConnection();

async function main() {
  let balance = await getNativeBalance(connection, WALLET_ADDRESS);
  console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

   console.log(`Wallet Balance: ${await getBalance(WALLET_ADDRESS1)} SOL`);
}

main();
