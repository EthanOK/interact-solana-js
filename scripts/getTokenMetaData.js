const { SOLANA_KEYPAIR, WALLET_ADDRESS } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { parsePair } = require("../utils/parsePair");
const { createAssociatedTokenAccount } = require("../utils/sendTransction");
const {
  getMintTokenInfo,
  getAssociatedTokenAccountAddress,
  getAssociatedTokenAccountInfo,
} = require("../utils/tokenInfo");
const connection = getDevConnection();
const signer = parsePair(SOLANA_KEYPAIR);

const tokenAddress = "Dmi5tZumaHP5qqh6196x715J2yiEHSS5Zx2rVcz3LnwP";

getMintTokenInfo(connection, tokenAddress);

const associatedTokenAddress = getAssociatedTokenAccountAddress(
  WALLET_ADDRESS,
  tokenAddress
);

console.log(associatedTokenAddress);

getAssociatedTokenAccountInfo(connection, associatedTokenAddress);
