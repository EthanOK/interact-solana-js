const { PublicKey } = require("./config");

async function getNativeBalance(connection, ownerAddress) {
  let balance = await connection.getBalance(new PublicKey(ownerAddress));
  return balance;
}
module.exports = { getNativeBalance };
