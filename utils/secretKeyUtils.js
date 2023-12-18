const bs58 = require("bs58");

function getPrivateKeyBySecretKey(secretKey) {
  const privateKey = bs58.encode(secretKey);
  return privateKey;
}

function getSecretKeyByPrivateKey(privateKey) {
  return bs58.decode(privateKey);
}

module.exports = { getPrivateKeyBySecretKey, getSecretKeyByPrivateKey };
