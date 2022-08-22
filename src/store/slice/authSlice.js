import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateWalletForCrypto } from "../../helpers/wallet";
import { addCurrency } from "../../constantsData/addCurrency";
const bip39 = require("bip39");

export const signupPageAction = () => {

  localStorage.setItem('wordlist', bip39.wordlists['english']);
}

export const checksumVaildateAction = (mnemonics) => {
  return mnemonics.filter(mnemonic => {
    try {
      bip39.mnemonicToEntropy(mnemonic);
      return true;
      // console.log(mnemonic, ':', 'valid')
    } catch (err) {
      // console.log(mnemonic, ':', 'invalid mnemonic');
      return false;
    }
  })

  // console.log(mnemonic, bip39.mnemonicToEntropy(mnemonic));
}

export const loginPageAction = createAsyncThunk(
  "loginPageAction",
  async (data, thunkAPI) => {
    if (!data.params) {
      data.params = bip39.generateMnemonic();
    }
    if (!localStorage.getItem("checkCrypto")) {
      const defaultCoin = addCurrency.filter((item, i) => item.default_enabled);
      // console.log("defaultCoin", defaultCoin);
      await localStorage.setItem("checkCrypto", JSON.stringify(defaultCoin));
    }
    let resData = {};
    let errorForResData = [];
    let cryptoData = await JSON.parse(localStorage.getItem("checkCrypto"));

    for (let crypto of cryptoData) {
      if (crypto.is_erc20) continue;

      try {
        let res = await generateWalletForCrypto(
          data.params,
          `${crypto.currency}`
        );
        resData[`${crypto.currency}`] = res;
      } catch (error) {
        errorForResData.push(error);
      }
    }
    if (errorForResData.length === 0) {
      localStorage.setItem(
        "user_crypto_currency_data",
        JSON.stringify(resData)
      );
      localStorage.setItem("mnemonics", data.params);
      data.cb(null, resData);
    } else {
      return data.cb(errorForResData[0], null);
    }
  }
);

const initialUser = localStorage.getItem("user_crypto_currency_data")
  ? JSON.parse(localStorage.getItem("user_crypto_currency_data"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    error: null,
    loader: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user_crypto_currency_data");
      localStorage.removeItem("checkCrypto");
      localStorage.removeItem("mnemonics");
      localStorage.removeItem("ethereum");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginPageAction.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(loginPageAction.fulfilled, (state, action) => {
      state.loader = false;
      state.user = action.payload;
    });
    builder.addCase(loginPageAction.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
