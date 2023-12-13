const SOLANA = require("@solana/web3.js");
const { getPrivateKeyBySecretKey } = require("./getPrivateKeyBySecretKey");
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, Keypair } =
  SOLANA;

async function main() {
  const keyPair = Keypair.generate();

  console.log("publicKey:" + keyPair.publicKey.toString());

  console.log("privateKey:" + getPrivateKeyBySecretKey(keyPair.secretKey));
}

main();
