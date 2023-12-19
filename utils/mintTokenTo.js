const { mintTo, mintToChecked } = require("@solana/spl-token");
const { PublicKey } = require("./config");

async function mintERC20Token(
  connection,
  signer,
  tokenAddress,
  associatedTokenAddress,
  amount
) {
  const signature = await mintTo(
    connection,
    signer,
    new PublicKey(tokenAddress),
    new PublicKey(associatedTokenAddress),
    signer,
    amount,
    [],
    "confirmed"
  );

  console.log("signature:" + signature);
}

module.exports = { mintERC20Token };
