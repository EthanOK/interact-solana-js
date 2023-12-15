const { createMint } = require("@solana/spl-token");
const { getDevConnection } = require("./getConnect");
const { parsePair } = require("./parsePair");
const { SOLANA_KEYPAIR } = require("./config");

const ownerKeypair = parsePair(SOLANA_KEYPAIR);

const connection = getDevConnection();

async function createFungibleToken() {
  const mintToken = await createMint(
    connection,
    ownerKeypair,
    ownerKeypair.publicKey,
    null,
    6 // We are using 9 to match the CLI decimal default exactly
  );

  console.log(mintToken.toBase58());
}

createFungibleToken();
