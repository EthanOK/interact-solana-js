const { SOLANA_KEYPAIR, WALLET_ADDRESS } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { parsePair } = require("../utils/parsePair");
const { getTokenAccountBalance } = require("../utils/postRequest");
const { createAssociatedTokenAccount } = require("../utils/sendTransction");
const {
  getMintTokenInfo,
  getAssociatedTokenAccountAddress,
  getAssociatedTokenAccountInfo,
  getTokenSupply,
  getTokenBalance,
} = require("../utils/tokenInfo");
const connection = getDevConnection();
const signer = parsePair(SOLANA_KEYPAIR);

const tokenAddress = "Dmi5tZumaHP5qqh6196x715J2yiEHSS5Zx2rVcz3LnwP";

async function main() {
  const tokenInfo = await getMintTokenInfo(connection, tokenAddress);
  console.log("tokenAddress:" + tokenAddress);
  console.log(tokenInfo);
  console.log("supply:", tokenInfo.supply, "decimals:", tokenInfo.decimals);

  const associatedTokenAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    WALLET_ADDRESS
  );

  console.log("associatedTokenAddress:" + associatedTokenAddress);

  console.log(
    `tokenBalance:${await getTokenAccountBalance(associatedTokenAddress)} Token`
  );

  // const associatedTokenAccount = await getAssociatedTokenAccountInfo(
  //   connection,
  //   associatedTokenAddress
  // );
  // console.log(associatedTokenAccount);

  const tokenBalance = await getTokenBalance(
    connection,
    tokenAddress,
    WALLET_ADDRESS
  );
  console.log("tokenBalance:" + tokenBalance);
}
main().catch(console.error);
