const bs58 = require("bs58");
function getSecretKeyByPrivateKey(privateKey) {
  return bs58.decode(privateKey);
}
module.exports = { getSecretKeyByPrivateKey };
