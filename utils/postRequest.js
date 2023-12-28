const { SOLANA_DEV_RPC, LAMPORTS_PER_SOL } = require("./config");

const getBalance = async (address_solana) => {
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [address_solana],
  };
  try {
    // Make the POST request using the fetch API
    const response = await fetch(SOLANA_DEV_RPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();

      const balance = responseData.result.value;

      return balance;
    } else {
      console.log("Network Error");
    }
  } catch (error) {
    console.log("Network Error");
  }
};

const getTokenAccountBalance = async (asociatedAccountAddress) => {
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountBalance",
    params: [asociatedAccountAddress],
  };
  try {
    // Make the POST request using the fetch API
    const response = await fetch(SOLANA_DEV_RPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      // console.log(responseData);

      const balance = responseData.result.value.amount;

      return balance;
    } else {
      console.log("Network Error");
    }
  } catch (error) {
    console.log("Network Error");
  }
};

const getTokenAccountsByDelegate = async (
  delegateAccountAddress,
  mintTokenAddress
) => {
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByDelegate",
    params: [
      delegateAccountAddress,
      {
        mint: mintTokenAddress,
      },
      {
        encoding: "jsonParsed",
      },
    ],
  };
  try {
    // Make the POST request using the fetch API
    const response = await fetch(SOLANA_DEV_RPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const values = responseData.result.value;
      if (values.length > 0) {
        let delegateData = [];

        values.forEach((value) => {
          const parsedData = value.account.data.parsed;

          delegateData.push({
            mint: parsedData.info.mint,
            owner: parsedData.info.owner,
            delegate: parsedData.info.delegate,
            delegatedAmount: parsedData.info.delegatedAmount.amount,
          });
        });

        console.log(delegateData);
        return delegateData;
      }

      // const balance = responseData.result.value.uiAmountString;

      // return balance;
    } else {
      console.log("Network Error");
    }
  } catch (error) {
    console.log("Network Error");
  }
};

const getDelegateTokenAmount = async (
  ownerAccountAddress,
  delegateAccountAddress,
  mintTokenAddress
) => {
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByDelegate",
    params: [
      delegateAccountAddress,
      {
        mint: mintTokenAddress,
      },
      {
        encoding: "jsonParsed",
      },
    ],
  };
  try {
    // Make the POST request using the fetch API
    const response = await fetch(SOLANA_DEV_RPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const values = responseData.result.value;
      let delegatedAmount = 0;
      if (values.length > 0) {
        values.forEach((value) => {
          const infoData = value.account.data.parsed.info;
          if (infoData.owner == ownerAccountAddress) {
            delegatedAmount = infoData.delegatedAmount.amount;
          }
        });
      }
      console.log(delegatedAmount);
      return delegatedAmount;
    } else {
      console.log("Network Error");
    }
  } catch (error) {
    console.log("Error");
  }
};

// getTokenAccountsByDelegate(
//   "AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z",
//   "2UdeCFZ38Y529jp4GL1AQsJpQLJdLKyW9hNk8H3SxD9B"
// );
// getDelegateTokenAmount(
//   "9rRKxLGok9xkP9jEotH783awqdesBSWsgJiC2ucPXPXU",
//   "AQAMLqdN3LSvaHx5tCVeWZWDRTGqL7QuvNgojCb3pS6Z",
//   "2UdeCFZ38Y529jp4GL1AQsJpQLJdLKyW9hNk8H3SxD9B"
// );

module.exports = {
  getBalance,
  getTokenAccountBalance,
  getTokenAccountsByDelegate,
  getDelegateTokenAmount,
};
