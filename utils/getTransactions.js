const { PublicKey } = require("@solana/web3.js");
const { WALLET_ADDRESS } = require("./config");
const { getDevConnection } = require("./getConnect");

const getTransactions = async (address, numTx) => {
  const pubKey = new PublicKey(address);

  const connnection = getDevConnection();

  let transactionList = await connnection.getSignaturesForAddress(pubKey, {
    limit: numTx,
  });

  let signatureList = transactionList.map(
    (transaction) => transaction.signature
  );
  let transactionDetails = await connnection.getParsedTransactions(
    signatureList,
    {
      maxSupportedTransactionVersion: 0,
    }
  );
  console.log(transactionDetails);
  transactionList.forEach((transaction, i) => {
    console.log(transaction);
    const date = new Date(transaction.blockTime * 1000);
    console.log(`Transaction No: ${i + 1}`);
    console.log(`Signature: ${transaction.signature}`);
    console.log(`Time: ${date.toLocaleString()}`);
    console.log(`Status: ${transaction.confirmationStatus}`);
    const transactionInstructions =
      transactionDetails[i].transaction.message.instructions;
    console.log(transactionInstructions);

    console.log("-".repeat(20));
  });
};
getTransactions(WALLET_ADDRESS, 1);
