const SOLANA = require("@solana/web3.js");
const { Keypair } = SOLANA;
const { getPrivateKeyBySecretKey } = require("./getPrivateKeyBySecretKey");
const pair0 = require("../keyPairs/AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z.json");
const { SOLANA_KEYPAIR } = require("./config");

async function main() {
  console.log(typeof SOLANA_KEYPAIR);
  console.log(typeof pair0);
  const keyPair = Keypair.fromSecretKey(Uint8Array.from(pair0));

  console.log("publicKey:" + keyPair.publicKey.toString());

  console.log("privateKey:" + getPrivateKeyBySecretKey(keyPair.secretKey));
}

main();
