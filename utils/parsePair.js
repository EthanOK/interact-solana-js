const { Keypair } = require("@solana/web3.js");

//
function parsePair(str_keyPair) {
  const pair = JSON.parse(str_keyPair);
  const keyPair = Keypair.fromSecretKey(Uint8Array.from(pair));

  return keyPair;
}

module.exports = { parsePair };
