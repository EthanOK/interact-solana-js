const { getMint } = require("@solana/spl-token");
const { PublicKey } = require("./config");
const { getDevConnection } = require("./getConnect");
const connection = getDevConnection();
async function getTokenMetaData(tokenAddress) {
  const mintInfo = await getMint(connection, new PublicKey(tokenAddress));
  console.log(mintInfo);
  return mintInfo;
}

getTokenMetaData("Dmi5tZumaHP5qqh6196x715J2yiEHSS5Zx2rVcz3LnwP");

getTokenMetaData("3tm55vKrBBZvWJ9nXa2dUFFnvrhvnsmUeLrMEjx6LXXm");
