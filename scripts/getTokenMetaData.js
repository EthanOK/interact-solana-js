const { Metaplex } = require("@metaplex-foundation/js");
const { PublicKey, Connection, clusterApiUrl } = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("mainnet-beta"));
const mintAddress = new PublicKey(
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
);
const metaplex = Metaplex.make(connection);
async function main() {
  const token = await metaplex.nfts().findByMint({ mintAddress });
  console.log(token.name);
  console.log(token.symbol);
  console.log(token.uri);
}

main();
