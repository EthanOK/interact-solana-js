const {
  mintTo,
  createMintToInstruction,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  transfer,
} = require("@solana/spl-token");
const { PublicKey } = require("./config");
const { getNativeBalance } = require("./getNativeBalance");
const {
  tokenAccountIsCreated,
  getAssociatedTokenAccountAddress,
  getTokenBalance,
} = require("./tokenInfo");
const { Transaction, sendAndConfirmTransaction } = require("@solana/web3.js");

function getSigners(signerOrMultisig, multiSigners) {
  return signerOrMultisig instanceof PublicKey
    ? [signerOrMultisig, multiSigners]
    : [signerOrMultisig.publicKey, [signerOrMultisig]];
}

async function transferERC20Token(
  connection,
  signer,
  tokenAddress,
  receiverAddress,
  amount
) {
  const signerBalance = await getTokenBalance(
    connection,
    tokenAddress,
    signer.publicKey
  );
  if (signerBalance < amount) {
    console.log("余额不足");
    return;
  }

  const fromAssociatedTokenAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    signer.publicKey
  );

  const toAssociatedTokenAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    receiverAddress
  );

  const isCreate = await tokenAccountIsCreated(
    connection,
    toAssociatedTokenAddress
  );

  const balance = await getNativeBalance(connection, toAssociatedTokenAddress);

  if (isCreate || balance > 0) {
    const signature = await transfer(
      connection,
      signer,
      new PublicKey(fromAssociatedTokenAddress),
      new PublicKey(toAssociatedTokenAddress),
      signer.publicKey,
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

module.exports = { transferERC20Token };
