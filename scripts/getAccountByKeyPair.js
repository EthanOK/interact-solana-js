const {
  getPrivateKeyBySecretKey,
  getSecretKeyByPrivateKey,
} = require("../utils/secretKeyUtils");
const pair0 = require("../keyPairs/AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z.json");
const { SOLANA_KEYPAIR, SOLANA_KEYPAIR1 } = require("../utils/config");
const { parsePair } = require("../utils/parsePair");

async function main() {
  const keyPair = parsePair(SOLANA_KEYPAIR1);

  console.log("publicKey:" + keyPair.publicKey.toString());

  console.log(keyPair.secretKey);

  const privateKey = getPrivateKeyBySecretKey(keyPair.secretKey);

  console.log("privateKey:" + privateKey);

  const secretKey1 = getSecretKeyByPrivateKey(privateKey);

  console.log(
    "secretKey == secretKey1:" +
      (keyPair.secretKey.toString() == secretKey1.toString())
  );
}

main();
