const {
  mintTo,
  createMintToInstruction,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  transfer,
  createTransferInstruction,
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
      [signer],
      "confirmed"
    );
    // 'confirmed' | 'finalized'
    console.log("signature:" + signature);
  } else {
    console.log(toAssociatedTokenAddress, "Account does not exist");
  }
}

async function transferERC20TokenIfNotExistCreateToAT(
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
    const [ownerPublicKey, signers] = getSigners(signer.publicKey, []);
    // 两条指令 1: reateAssociatedTokenAccount 2: createTransfer
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        signer.publicKey,
        new PublicKey(toAssociatedTokenAddress),
        new PublicKey(receiverAddress),
        new PublicKey(tokenAddress),
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
      [signer, ...signers],
      "confirmed"
    );
    console.log("signature:" + signature);
  }
}

async function transferFromERC20TokenIfNotExistCreateToAT(
    connection,
    payer,
    tokenAddress,
    fromAddress,
    receiverAddress,
    amount
  ) {
    const signerBalance = await getTokenBalance(
      connection,
      tokenAddress,
      fromAddress
    );
    if (signerBalance < amount) {
      console.log("余额不足");
      return;
    }
    const fromAssociatedTokenAddress = await getAssociatedTokenAccountAddress(
      tokenAddress,
      fromAddress
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
          new PublicKey(receiverAddress),
          new PublicKey(tokenAddress),
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
  }

module.exports = { transferERC20Token, transferERC20TokenIfNotExistCreateToAT,transferFromERC20TokenIfNotExistCreateToAT };
