const web3 = require("@solana/web3.js");
const { getDevConnection } = require("./getConnect");
const { SOLANA_KEYPAIR, RECEIVER_ADDRESS } = require("./config");
const { parsePair } = require("./parsePair");

const connection = getDevConnection();
const from_Keypair = parsePair(SOLANA_KEYPAIR);
const toPubkey = new web3.PublicKey(RECEIVER_ADDRESS);

async function sendTransction() {
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from_Keypair.publicKey,
      toPubkey: toPubkey,
      lamports: web3.LAMPORTS_PER_SOL,
    })
  );

  // Sign transaction, broadcast, and confirm
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from_Keypair]
  );
  console.log("SIGNATURE", signature);
}

sendTransction();
