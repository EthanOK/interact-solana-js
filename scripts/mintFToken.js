const { SOLANA_KEYPAIR, WALLET_ADDRESS } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const {
  mintERC20Token,
  mintERC20TokenIfNotExistCreateAT,
} = require("../utils/mintTokenTo");
const { parsePair } = require("../utils/parsePair");
const { getTokenDecimals } = require("../utils/tokenInfo");

const connection = getDevConnection();
const signer = parsePair(SOLANA_KEYPAIR);
const tokenAddress = "Dmi5tZumaHP5qqh6196x715J2yiEHSS5Zx2rVcz3LnwP";
const receiverAddress = "2xuEyZoSkiiNBAgL21XobUCraojPUZ82GHuWpCPgpyXF";
async function main() {
  const decimals = await getTokenDecimals(connection, tokenAddress);
  // await mintERC20Token(
  //   connection,
  //   signer,
  //   tokenAddress,
  //   receiverAddress,
  //   300 * 10 ** decimals
  // );
  await mintERC20TokenIfNotExistCreateAT(
    connection,
    signer,
    tokenAddress,
    receiverAddress,
    300 * 10 ** decimals
  );
  
}
main().then(() => process.exit(0));
