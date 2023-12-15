const SOLANA = require("@solana/web3.js");
const { Keypair } = SOLANA;
const { getPrivateKeyBySecretKey } = require("./getPrivateKeyBySecretKey");
const pair0 = require("../keyPairs/AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z.json");
const { SOLANA_KEYPAIR } = require("./config");
const { parsePair } = require("./parsePair");

async function main() {
  const keyPair = parsePair(SOLANA_KEYPAIR);

  console.log("publicKey:" + keyPair.publicKey.toString());

  console.log("privateKey:" + getPrivateKeyBySecretKey(keyPair.secretKey));
}

main();
