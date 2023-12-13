const SOLANA = require("@solana/web3.js");
const { Keypair } = SOLANA;
const { getPrivateKeyBySecretKey } = require("./getPrivateKeyBySecretKey");
const pair0 = require("../keyPairs/AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z.json");

async function main() {
  const keyPair = Keypair.fromSecretKey(Uint8Array.from(pair0));

  console.log("publicKey:" + keyPair.publicKey.toString());

  console.log("privateKey:" + getPrivateKeyBySecretKey(keyPair.secretKey));
}

main();
