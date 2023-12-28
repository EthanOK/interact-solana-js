const {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddress,
  NATIVE_MINT,
  createSyncNativeInstruction,
  closeAccount,
  getOrCreateAssociatedTokenAccount,
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
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [signer],
    "confirmed"
  );

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
    console.log("associatedTokenAddress", associatedToken.toBase58());
    console.log("SIGNATURE", signature);
  } catch (error) {}

  const associatedTokenAccount = await getAccount(
    connection,
    associatedToken,
    "confirmed"
  );

  return associatedTokenAccount;
}
 

// SOL => Wrapped SOL

async function convertWrappedSOL(connection, signer, amount) {
  const associatedTokenAccount = await getAssociatedTokenAddress(
    NATIVE_MINT,
    signer.publicKey
  );
  let hasAssociatedTokenAccount = false;
  try {
    await getAccount(connection, associatedTokenAccount, "confirmed");
    hasAssociatedTokenAccount = true;
  } catch {}
  console.log("hasAssociatedTokenAccount:" + hasAssociatedTokenAccount);
  let transaction;
  if (!hasAssociatedTokenAccount) {
    transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        signer.publicKey,
        associatedTokenAccount,
        signer.publicKey,
        NATIVE_MINT
      ),
      SystemProgram.transfer({
        fromPubkey: signer.publicKey,
        toPubkey: associatedTokenAccount,
        lamports: LAMPORTS_PER_SOL,
      }),
      createSyncNativeInstruction(associatedTokenAccount)
    );
  } else {
    transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: signer.publicKey,
        toPubkey: associatedTokenAccount,
        lamports: amount,
      }),
      createSyncNativeInstruction(associatedTokenAccount)
    );
  }

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [signer],
    "confirmed"
  );

  await connection.confirmTransaction(signature, "confirmed");
  console.log(signature);
}

//  Wrapped SOL => SOL

async function unWrapSOL(connection, signer) {
  const associatedTokenAccount = await getAssociatedTokenAddress(
    NATIVE_MINT,
    signer.publicKey
  );
  const signature = await closeAccount(
    connection,
    signer,
    associatedTokenAccount,
    signer.publicKey,
    signer
  );
  await connection.confirmTransaction(signature, "confirmed");
  console.log(signature);
}

module.exports = {
  sendTransactionSOL,
  createAssociatedTokenAccount,
  convertWrappedSOL,
  unWrapSOL,
};
