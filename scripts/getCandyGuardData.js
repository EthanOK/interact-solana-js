const { getDevConnection } = require("../utils/getConnect");
const { getProgram } = require("../utils/getProgram");
const { parsePair } = require("../utils/parsePair");

const idl = require("../idls/candy_guard.json");
const { PublicKey, SOLANA_KEYPAIR } = require("../utils/config");

async function main() {
  const program_id = "Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g";
  const calculatorPublicKey = new PublicKey(
    "2Cd9qhUTnxmmTCW4JHXHgi2daZf4e7xU1RYoS7L8u7yS"
  );
  const connection = getDevConnection();
  const payer = parsePair(SOLANA_KEYPAIR);

  const program = await getProgram(connection, payer, idl, program_id);

  const account = await program.account.candyGuard.fetch(calculatorPublicKey);

  console.log(account);
}

main();
