import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosCoingecko from "../../helpers/Axios/axiosCoingecko";
import AxiosTatum, { authHeadersTatum } from "../../helpers/Axios/axiosTatum";

export const getBalance = createAsyncThunk(
  "getBalance",
  async (data, thunkAPI) => {
    try {
      if (data.coin_type === "bitcoin") {
        const response = await AxiosTatum.get(
          `/${data.coin}/address/balance/${data.address}`,
          authHeadersTatum()
        );

        return {
          [data.coin]: (
            response.data.incoming - response.data.outgoing
          ).toString(),
        };
      }
      const response = await AxiosTatum.get(
        `/${data.coin}/account/balance/${data.address}`,
        authHeadersTatum()
      );
      console.log("balanceResponse", [data.coin], response.data.balance);
      return { [data.coin]: response.data.balance };
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const coinBasedTokenBalance = createAsyncThunk(
  "coinBasedTokenBalance",
  async (data, thunkAPI) => {
    try {
      const response = await AxiosTatum.get(
        `/${data.coin}/account/balance/${data.address}`,
        authHeadersTatum()
      );
      console.log(
        "coinBasedTokenBalanceResponse",
        [data.coin],
        response.data.balance
      );
      return { [data.coin]: response.data.balance };
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const getErc20Balance = createAsyncThunk(
  "getErc20Balance",
  async (data, thunkAPI) => {
    try {
      const response = await AxiosTatum.get(
        `/blockchain/token/balance/${data.coin}/${data.contract_address}/${data.address}`,
        authHeadersTatum(data.testnet_type ? data.testnet_type : "")
      );

      return {
        [data.token]: (response.data.balance / 10 ** data.digits).toString(),
      };
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

export const clearBalance = createAsyncThunk(
  "clearBalance",
  async (data, thunkAPI) => {
    return;
  }
);

export const currencyPriceDetail = createAsyncThunk(
  "currencyPriceDetail",
  async (data, thunkAPI) => {
    try {
      const response = await AxiosCoingecko.get(
        `/simple/price?ids=${data.coins}&vs_currencies=${data.currency}`
      );
      console.log("currencyprice", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: [],
    erc20Balance: [],
    tokenBalance: [],
    currencyPrice: null,
    error: null,
    loader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.loader = false;

      const cryptoCoins =
        localStorage.getItem("checkCrypto") &&
        JSON.parse(localStorage.getItem("checkCrypto"));

      const currency = localStorage.getItem("currency").toLowerCase();

      let prevBalance = [...state.balance];
      let tempBalance;
      for (let i = 0; i < cryptoCoins.length; i++) {
        if (!cryptoCoins[i].is_erc20 && currency) {
          const bal =
            action.payload && action.payload[cryptoCoins[i].tatum_coin_name];
          // console.log("action.payload", action.payload);

          if (bal) {
            // console.log(
            //   "balanceInIf",
            //   bal,
            //   action.payload[cryptoCoins[i].tatum_coin_name]
            // );
            tempBalance = {
              balance: +bal,
              name: cryptoCoins[i].display_currency,
              fiat_val:
                state.currencyPrice[cryptoCoins[i]?.coingecko_coin_name][
                  currency
                ],
              fiat_balance:
                bal *
                +state.currencyPrice[cryptoCoins[i]?.coingecko_coin_name][
                  currency
                ],
            };
          }
        } else {
          continue;
        }
      }
      // console.log("tempBalance", tempBalance);
      state.balance = [...prevBalance, tempBalance];
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });

    builder.addCase(getErc20Balance.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getErc20Balance.fulfilled, (state, action) => {
      state.loader = false;

      const cryptoCoins =
        localStorage.getItem("checkCrypto") &&
        JSON.parse(localStorage.getItem("checkCrypto"));

      const currency = localStorage.getItem("currency").toLowerCase();

      let prevBalance = [...state.erc20Balance];
      let tempBalance;
      for (let i = 0; i < cryptoCoins.length; i++) {
        if (cryptoCoins[i].is_erc20 && currency) {
          const balance =
            action.payload && action.payload[cryptoCoins[i].currency];
          // const balance = bal?.balance / 10 ** +bal?.decimals;
          if (balance) {
            console.log(
              "balanceEth",
              balance,
              cryptoCoins[i].currency,
              state.currencyPrice[cryptoCoins[i].coingecko_coin_name][currency]
            );
            tempBalance = {
              balance: +balance,
              name: cryptoCoins[i].display_currency,
              fiat_val:
                state.currencyPrice[cryptoCoins[i].coingecko_coin_name][
                  currency
                ],
              //TODO total_balance -> fiat_balance
              fiat_balance:
                +balance *
                +state.currencyPrice[cryptoCoins[i].coingecko_coin_name][
                  currency
                ],
            };
          }
        } else {
          continue;
        }
      }
      state.erc20Balance = [...prevBalance, tempBalance];
    });
    // builder.addCase(getErc20Balance.fulfilled, (state, action) => {
    //   state.loader = false;
    //   const cryptoCoins =
    //     localStorage.getItem("checkCrypto") &&
    //     JSON.parse(localStorage.getItem("checkCrypto"));

    //   const currency = localStorage.getItem("currency").toLowerCase();

    //   let prevBalance = [...state.erc20Balance];
    //   let tempBalance;
    //   for (let i = 0; i < cryptoCoins.length; i++) {
    //     if (cryptoCoins[i].is_erc20) {
    //       // const name = cryptoCoins[i].coin;
    //       const bal = action.payload[cryptoCoins[i].currency];
    //       const balance = bal?.balance / 10 ** +bal?.decimals;

    //       if (
    //         bal &&
    //         cryptoCoins[i].currency &&
    //         state.currencyPrice[cryptoCoins[i].coingecko_coin_name][currency]
    //       ) {
    //         tempBalance = {
    //           // [name]: {
    //           balance: balance,
    //           name: cryptoCoins[i].display_currency,
    //           fiat_val:
    //             state.currencyPrice[cryptoCoins[i].coingecko_coin_name][
    //               currency
    //             ],
    //           total_balance:
    //             balance *
    //             +state.currencyPrice[cryptoCoins[i].coingecko_coin_name][
    //               currency
    //             ],
    //           // },
    //         };
    //       }
    //     } else {
    //       continue;
    //     }
    //   }
    //   state.erc20Balance = [...prevBalance, tempBalance];
    // });
    builder.addCase(getErc20Balance.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(coinBasedTokenBalance.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(coinBasedTokenBalance.fulfilled, (state, action) => {
      state.loader = false;
      state.tokenBalance = action.payload;
    });
    builder.addCase(coinBasedTokenBalance.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(currencyPriceDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(currencyPriceDetail.fulfilled, (state, action) => {
      state.loader = false;
      state.currencyPrice = action.payload;
    });
    builder.addCase(currencyPriceDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(clearBalance.fulfilled, (state, action) => {
      state.balance = [];
      state.erc20Balance = [];
    });
  },
});

export default balanceSlice.reducer;
