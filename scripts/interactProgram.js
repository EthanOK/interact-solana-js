// Program Id: CyXsdASRxQqtNwNyhkw2B31HxC3ueWWhRy12bjUYMHFf
// Owner: BPFLoaderUpgradeab1e11111111111111111111111
// ProgramData Address: Erya7npic56c4rssLv1CuDcCkfB3xBA8QXHWhRdSgSKW
// Authority: 9rRKxLGok9xkP9jEotH783awqdesBSWsgJiC2ucPXPXU

const {
  PublicKey,
  Transaction,
  TransactionInstruction,
  Account,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");
const { getDevConnection } = require("../utils/getConnect");
const { SOLANA_KEYPAIR } = require("../utils/config");
const { parsePair } = require("../utils/parsePair");

const programId = new PublicKey("36yXHfBtjQoAQuSxa64n4mno8iQk2QfyPbMPjcYm1JJo");
const connection = getDevConnection();

const signer = parsePair(SOLANA_KEYPAIR);

async function main() {
  // 构建只读交易
  const transaction = new Transaction().add(
    new TransactionInstruction({
      keys: [],
      programId: programId,
    })
  );

  console.log("Sending transaction...");
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    signer,
  ]);
  console.log("Transaction hash:", signature);

  const parsedTransactionWithMeta = await connection.getParsedTransaction(
    signature
  );
  console.log(parsedTransactionWithMeta.meta.logMessages);
}

main();
