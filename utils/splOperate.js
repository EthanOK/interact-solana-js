const {
  approve,
  revoke,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  transfer,
} = require("@solana/spl-token");
const { getAssociatedTokenAccountAddress, getTokenBalance, tokenAccountIsCreated } = require("./tokenInfo");
const { PublicKey } = require("./config");
const { Transaction } = require("@solana/web3.js");
const { getNativeBalance } = require("./getNativeBalance");

// spl == ERC20

// 只能授权给一个账户，旧的 delegate 被 Revoke
const splApprove = async (
  connection,
  payer,
  mintTokenAddress,
  delegateAddress,
  amount
) => {
  const associatedTokenAddress = await getAssociatedTokenAccountAddress(
    mintTokenAddress,
    payer.publicKey
  );
  const signature = await approve(
    connection,
    payer,
    new PublicKey(associatedTokenAddress),
    new PublicKey(delegateAddress),
    payer.publicKey,
    amount,
    [],
    "confirmed"
  );
  console.log("signature:" + signature);
};

// 移除 payer 在 mintToken 的 delegate 账户
const splRevoke = async (connection, payer, mintTokenAddress) => {
  const associatedTokenAddress = await getAssociatedTokenAccountAddress(
    mintTokenAddress,
    payer.publicKey
  );
  const signature = await revoke(
    connection,
    payer,
    new PublicKey(associatedTokenAddress),
    payer.publicKey,
    [],
    "confirmed"
  );
  console.log("signature:" + signature);
};

const splTransferFrom = async (
  connection,
  payer,
  mintTokenAddress,
  fromAddress,
  toAddress,
  amount
) => {
  const fromBalance = await getTokenBalance(
    connection,
    mintTokenAddress,
    fromAddress
  );
  if (fromBalance < amount) {
    console.log("余额不足");
    return;
  }
  const fromAssociatedTokenAddress = await getAssociatedTokenAccountAddress(
    mintTokenAddress,
    fromAddress
  );

  const toAssociatedTokenAddress = await getAssociatedTokenAccountAddress(
    mintTokenAddress,
    toAddress
  );
  const isCreate = await tokenAccountIsCreated(
    connection,
    toAssociatedTokenAddress
  );

  const balance = await getNativeBalance(connection, toAssociatedTokenAddress);

  if (isCreate || balance > 0) {
    const signature = await transfer(
      connection,
      payer,
      new PublicKey(fromAssociatedTokenAddress),
      new PublicKey(toAssociatedTokenAddress),
      payer.publicKey,
      amount,
      [],
      "confirmed"
    );
    // 'confirmed' | 'finalized'
    console.log("signature:" + signature);
  } else {
    const [ownerPublicKey, signers] = getSigners(payer.publicKey, []);
    // 两条指令 1: reateAssociatedTokenAccount 2: createTransfer
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        payer.publicKey,
        new PublicKey(toAssociatedTokenAddress),
        new PublicKey(toAddress),
        new PublicKey(mintTokenAddress),
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      createTransferInstruction(
        new PublicKey(fromAssociatedTokenAddress),
        new PublicKey(toAssociatedTokenAddress),
        ownerPublicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payer, ...signers],
      "confirmed"
    );
    console.log("signature:" + signature);
  }
};

function getSigners(signerOrMultisig, multiSigners) {
  return signerOrMultisig instanceof PublicKey
    ? [signerOrMultisig, multiSigners]
    : [signerOrMultisig.publicKey, [signerOrMultisig]];
}

module.exports = { splApprove, splRevoke, splTransferFrom };
