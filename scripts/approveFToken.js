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

const connection = getDevConnection();
// payer 支付交易费
const payer = parsePair(SOLANA_KEYPAIR);
const tokenAddress = "2UdeCFZ38Y529jp4GL1AQsJpQLJdLKyW9hNk8H3SxD9B";
const fromAddres = WALLET_ADDRESS;
const delegate = parsePair(SOLANA_KEYPAIR1);
const delegateAddress = WALLET_ADDRESS1;
async function main() {
  const decimals = await getTokenDecimals(connection, tokenAddress);

  const associatedTokenAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    payer.publicKey
  );
//   await revoke()

    // const signature = await approve(
    //   connection,
    //   payer,
    //   new PublicKey(associatedTokenAddress),
    //   new PublicKey(delegateAddress),
    //   payer.publicKey,
    //   1000 * 10 ** decimals,
    //   [],
    //   "confirmed"
    // );
    // console.log("signature:" + signature);

  await transferFromERC20TokenIfNotExistCreateToAT(
    connection,
    delegate,
    tokenAddress,
    fromAddres,
    delegateAddress,
    10 * 10 ** decimals
  );

}
main().then(() => process.exit(0));
