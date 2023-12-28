const { approve, revoke } = require("@solana/spl-token");
const {
  SOLANA_KEYPAIR,
  WALLET_ADDRESS,
  WALLET_ADDRESS1,
  PublicKey,
  SOLANA_KEYPAIR1,
} = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");

const { parsePair } = require("../utils/parsePair");
const {
  getTokenDecimals,
  getAssociatedTokenAccountAddress,
} = require("../utils/tokenInfo");
const {
  transferERC20TokenIfNotExistCreateToAT,
  transferFromERC20TokenIfNotExistCreateToAT,
} = require("../utils/transferFTokenTo");
const {
  splApprove,
  splRevoke,
  splTransferFrom,
} = require("../utils/splOperate");
const { getDelegateTokenAmount } = require("../utils/postRequest");

const connection = getDevConnection();
// payer 支付交易费
const payer = parsePair(SOLANA_KEYPAIR);
const tokenAddress = "2UdeCFZ38Y529jp4GL1AQsJpQLJdLKyW9hNk8H3SxD9B";
const fromAddress = WALLET_ADDRESS;
const delegate = parsePair(SOLANA_KEYPAIR1);
const delegateAddress = WALLET_ADDRESS1;
const receiverAddress = "2xuEyZoSkiiNBAgL21XobUCraojPUZ82GHuWpCPgpyXF";
async function main() {


  // await splApprove(connection, payer, tokenAddress, delegateAddress, 123456789);
  await getDelegateTokenAmount(fromAddress, delegateAddress, tokenAddress);

  // await splTransferFrom(
  //   connection,
  //   delegate,
  //   tokenAddress,
  //   fromAddress,
  //   receiverAddress,
  //   789
  // );

  // await getDelegateTokenAmount(fromAddress, delegateAddress, tokenAddress);
  // await splRevoke(connection, payer, tokenAddress);
}
main().then(() => process.exit(0));
