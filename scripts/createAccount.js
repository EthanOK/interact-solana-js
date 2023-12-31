const { Keypair } = require("@solana/web3.js");
const { getPrivateKeyBySecretKey } = require("../utils/secretKeyUtils");

async function main() {
  const keyPair = Keypair.generate();

  console.log("publicKey:" + keyPair.publicKey.toString());

  console.log("privateKey:" + getPrivateKeyBySecretKey(keyPair.secretKey));
}

main();
