const { TOKEN_PROGRAM_ID, AccountLayout } = require("@solana/spl-token");
const { PublicKey } = require("./config");
const { getTokenDecimals } = require("./tokenInfo");

async function getTokenAccountsByOwner(connection, ownerAddress) {
  const data = [];
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey(ownerAddress),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  for (const tokenAccount of tokenAccounts.value) {
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    const decimals = await getTokenDecimals(
      connection,
      accountData.mint.toBase58()
    );

    data.push({
      tokenAddress: accountData.mint.toBase58(),
      amount: accountData.amount,
      decimals: decimals,
    });
  }

  return data;
}
module.exports = { getTokenAccountsByOwner };
