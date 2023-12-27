const {
  mintTo,
  createMintToInstruction,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");
const { PublicKey } = require("./config");
const { getNativeBalance } = require("./getNativeBalance");
const {
  tokenAccountIsCreated,
  getAssociatedTokenAccountAddress,
} = require("./tokenInfo");
const { Transaction, sendAndConfirmTransaction } = require("@solana/web3.js");

function getSigners(signerOrMultisig, multiSigners) {
  return signerOrMultisig instanceof PublicKey
    ? [signerOrMultisig, multiSigners]
    : [signerOrMultisig.publicKey, [signerOrMultisig]];
}

/* 
associatedTokenAccount: Must have been created
 */
async function mintERC20Token(
  connection,
  signer,
  tokenAddress,
  receiverAddress,
  amount
) {
  const associatedTokenAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    receiverAddress
  );

  const isCreate = await tokenAccountIsCreated(
    connection,
    associatedTokenAddress
  );

  const balance = await getNativeBalance(connection, associatedTokenAddress);

  if (isCreate || balance > 0) {
    const signature = await mintTo(
      connection,
      signer,
      new PublicKey(tokenAddress),
      new PublicKey(associatedTokenAddress),
      signer,
      amount,
      [],
      "confirmed"
    );
    // 'confirmed' | 'finalized'
    console.log("signature:" + signature);
  } else {
    console.log(associatedTokenAddress, "Account does not exist");
  }
}

/* 
associatedTokenAccount: If it Not Exist will Create it
 */
async function mintERC20TokenIfNotExistCreateAT(
  connection,
  signer,
  tokenAddress,
  receiverAddress,
  amount
) {
  const associatedTokenAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    receiverAddress
  );
  const isCreate = await tokenAccountIsCreated(
    connection,
    associatedTokenAddress
  );

  const balance = await getNativeBalance(connection, associatedTokenAddress);

  if (isCreate || balance > 0) {
    const signature = await mintTo(
      connection,
      signer,
      new PublicKey(tokenAddress),
      new PublicKey(associatedTokenAddress),
      signer,
      amount,
      [],
      "confirmed"
    );
    // 'confirmed' | 'finalized'
    console.log("signature:" + signature);
  } else {
    const [authorityPublicKey, signers] = getSigners(signer, []);

    // 两条指令 1: reateAssociatedTokenAccount 2: createMintTo
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        signer.publicKey,
        new PublicKey(associatedTokenAddress),
        new PublicKey(receiverAddress),
        new PublicKey(tokenAddress),
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      createMintToInstruction(
        new PublicKey(tokenAddress),
        new PublicKey(associatedTokenAddress),
        authorityPublicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [signer, ...signers],
      "confirmed"
    );
    console.log("signature:" + signature);
  }
}

module.exports = { mintERC20Token, mintERC20TokenIfNotExistCreateAT };
