const {
  approve,
  revoke,
  setAuthority,
  AuthorityType,
} = require("@solana/spl-token");
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
  splApprove,
  splRevoke,
  splTransferFrom,
  splSetAuthority,
} = require("../utils/splOperate");

const connection = getDevConnection();
// payer 支付交易费
const payer = parsePair(SOLANA_KEYPAIR);
const tokenAccountAddress = "2UdeCFZ38Y529jp4GL1AQsJpQLJdLKyW9hNk8H3SxD9B";

async function giveUpMintAuthorize() {
  await splSetAuthority(
    connection,
    payer,
    tokenAccountAddress,
    AuthorityType.MintTokens,
    null
  );
}
async function main() {
  await giveUpMintAuthorize();
}

main();
