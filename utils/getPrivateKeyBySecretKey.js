const bs58 = require("bs58");
function getPrivateKeyBySecretKey(secretKey) {
  const privateKey = bs58.encode(secretKey);
  return privateKey;
}
module.exports = { getPrivateKeyBySecretKey };
