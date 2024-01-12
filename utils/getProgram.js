const anchor = require("@coral-xyz/anchor");

const getProgram = async (connection, payer, idl, program_id) => {
  const wallet = new anchor.Wallet(payer);

  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    anchor.AnchorProvider.defaultOptions
  );
  anchor.setProvider(provider);
  const program = new anchor.Program(idl, program_id);
  return program;
};

module.exports = { getProgram };
