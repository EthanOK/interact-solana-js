const { SOLANA_KEYPAIR, WALLET_ADDRESS } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { mintERC20Token } = require("../utils/mintTokenTo");
const { parsePair } = require("../utils/parsePair");
const {
  getAssociatedTokenAccountAddress,
  getTokenDecimals,
} = require("../utils/tokenInfo");

const connection = getDevConnection();
const signer = parsePair(SOLANA_KEYPAIR);
const tokenAddress = "Dmi5tZumaHP5qqh6196x715J2yiEHSS5Zx2rVcz3LnwP";
async function main() {
  const associatedTokenAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    "AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z"
    // WALLET_ADDRESS
  );

  const decimals = await getTokenDecimals(connection, tokenAddress);

  await mintERC20Token(
    connection,
    signer,
    tokenAddress,
    associatedTokenAddress,
    300 * 10 ** decimals
  );
}
main().then(() => process.exit(0));
