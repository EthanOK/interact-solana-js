const { SOLANA_KEYPAIR, WALLET_ADDRESS } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const {
  mintERC20Token,
  mintERC20TokenIfNotExistCreateAT,
} = require("../utils/mintTokenTo");
const { parsePair } = require("../utils/parsePair");
const { getTokenDecimals } = require("../utils/tokenInfo");
const { transferERC20Token, transferERC20TokenIfNotExistCreateToAT } = require("../utils/transferFTokenTo");

const connection = getDevConnection();
const signer = parsePair(SOLANA_KEYPAIR);
const tokenAddress = "2UdeCFZ38Y529jp4GL1AQsJpQLJdLKyW9hNk8H3SxD9B";
const receiverAddress = "2xuEyZoSkiiNBAgL21XobUCraojPUZ82GHuWpCPgpyXF";
async function main() {
  const decimals = await getTokenDecimals(connection, tokenAddress);

  await transferERC20TokenIfNotExistCreateToAT(
    connection,
    signer,
    tokenAddress,
    receiverAddress,
    100 * 10 ** decimals
  );

}
main().then(() => process.exit(0));
