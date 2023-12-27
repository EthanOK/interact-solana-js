const {
  getMint,
  getAccount,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} = require("@solana/spl-token");

const { PublicKey } = require("./config");

async function getMintTokenInfo(connection, tokenAddress) {
  const mintInfo = await getMint(connection, new PublicKey(tokenAddress));
  return mintInfo;
}

async function getTokenSupply(connection, tokenAddress) {
  const mintInfo = await getMint(connection, new PublicKey(tokenAddress));
  return mintInfo.supply;
}

async function getTokenDecimals(connection, tokenAddress) {
  const mintInfo = await getMint(connection, new PublicKey(tokenAddress));
  return mintInfo.decimals;
}

async function getAssociatedTokenAccountInfo(
  connection,
  associatedTokenAddress
) {
  const accountInfo = await getAccount(
    connection,
    new PublicKey(associatedTokenAddress)
  );
  return accountInfo;
}

async function tokenAccountIsCreated(connection, tokenAddress) {
  try {
    await getAccount(connection, new PublicKey(tokenAddress));
    return true;
  } catch (error) {
    return false;
  }
}

async function getTokenBalance(connection, tokenAddress, ownerAddress) {
  const asociatedAddress = await getAssociatedTokenAccountAddress(
    tokenAddress,
    ownerAddress
  );
  const asociatedAccountInfo = await getAccount(
    connection,
    new PublicKey(asociatedAddress)
  );
  return asociatedAccountInfo.amount;
}

async function getAssociatedTokenAccountAddress(tokenAddress, ownerAddress) {
  // const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   signer,
  //   new PublicKey(tokenAddress),
  //   new PublicKey(personalAddress)
  // );

  // console.log(associatedTokenAccount);
  // return associatedTokenAccount;

  const associatedToken = await getAssociatedTokenAddress(
    new PublicKey(tokenAddress),
    new PublicKey(ownerAddress),
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  return associatedToken.toBase58();
}

module.exports = {
  getMintTokenInfo,
  getAssociatedTokenAccountInfo,
  getAssociatedTokenAccountAddress,
  getTokenSupply,
  getTokenDecimals,
  getTokenBalance,
  tokenAccountIsCreated,
};
