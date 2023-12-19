const { WALLET_ADDRESS, WALLET_ADDRESS1 } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { getTokenAccountsByOwner } = require("../utils/getTokenAccounts");

const connection = getDevConnection();

async function mian() {
  const data = await getTokenAccountsByOwner(connection, WALLET_ADDRESS);
  console.log(data);
}

mian().catch(console.error);
