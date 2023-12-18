const {
  getMint,
  getAccount,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");

const { PublicKey } = require("./config");

async function getMintTokenInfo(connection, tokenAddress) {
  const mintInfo = await getMint(connection, new PublicKey(tokenAddress));
  console.log(mintInfo);
  return mintInfo;
}

async function getAssociatedTokenAccountInfo(
  connection,
  associatedTokenAddress
) {
  const accountInfo = await getAccount(
    connection,
    new PublicKey(associatedTokenAddress)
  );
  console.log(accountInfo);
  return accountInfo;
}

function getAssociatedTokenAccountAddress(ownerAddress, tokenAddress) {
  // const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   signer,
  //   new PublicKey(tokenAddress),
  //   new PublicKey(personalAddress)
  // );

  // console.log(associatedTokenAccount);
  // return associatedTokenAccount;

  const associatedToken = getAssociatedTokenAddressSync(
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
};
