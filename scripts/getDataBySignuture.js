const { SOLANA_KEYPAIR } = require("../utils/config");
const { getDevConnection } = require("../utils/getConnect");
const { parsePair } = require("../utils/parsePair");

const signature =
  "5zvUQ4D34yzyMrfpL3iqocNRwrPQNkRgFSmUgwiWhnhsT2GmpjXaAXPLhPonxJ8bxvpU1trwFLNQtkKNwSmBUmYv";
const connection = getDevConnection();

const signer = parsePair(SOLANA_KEYPAIR);
async function mian() {
  const parsedTransactionWithMeta = await connection.getParsedTransaction(
    signature
  );
  console.log(parsedTransactionWithMeta.meta.logMessages);
}
mian();
