const { SOLANA_KEYPAIR } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { parsePair } = require("../utils/parsePair");
const { createAssociatedTokenAccount } = require("../utils/sendTransction");
const connection = getDevConnection();
const signer = parsePair(SOLANA_KEYPAIR);

const tokenAddress = "Dmi5tZumaHP5qqh6196x715J2yiEHSS5Zx2rVcz3LnwP";

createAssociatedTokenAccount(
  connection,
  signer,
  tokenAddress,
  "AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z"
);
