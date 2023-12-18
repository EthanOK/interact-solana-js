const {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
} = require("@solana/spl-token");

const {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

async function sendTransactionSOL(connection, signer, toAddress, amount) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: signer.publicKey,
      toPubkey: new PublicKey(toAddress),
      lamports: amount,
    })
  );

  // Sign transaction, broadcast, and confirm
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    signer,
  ]);

  console.log("SIGNATURE", signature);
}

async function createAssociatedTokenAccount(
  connection,
  signer,
  tokenAddress,
  ownerAddress
) {
  const associatedToken = getAssociatedTokenAddressSync(
    new PublicKey(tokenAddress),
    new PublicKey(ownerAddress),
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  try {
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        signer.publicKey,
        associatedToken,
        new PublicKey(ownerAddress),
        new PublicKey(tokenAddress),
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [signer],
      "confirmed"
    );

    console.log("SIGNATURE", signature);
  } catch (error) {}

  const associatedTokenAccount = await getAccount(connection, associatedToken);
  console.log(
    "associatedTokenAddress:" + associatedTokenAccount.address.toBase58()
  );
  return associatedTokenAccount;
}

module.exports = { sendTransactionSOL, createAssociatedTokenAccount };
