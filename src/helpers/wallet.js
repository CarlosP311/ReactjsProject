import {
  generateWallet,
  Currency,
  generateAddressFromXPub,
  generatePrivateKeyFromMnemonic,
} from "@tatumio/tatum";

export const generateWalletForCrypto = async (mnemonics_data, Cur, cb) => {
  // var mnemonics;
  var pub_key;
  var privateKey;
  // if (!mnemonics_data) {
  //   mnemonics = bip39.generateMnemonic();
  // } else {
  //   mnemonics = mnemonics_data;
  // }
  const wallet = await generateWallet(Currency[Cur], true, mnemonics_data);
  // console.log("wallet", wallet);
  // mnemonics = wallet.mnemonic;
  pub_key = wallet.xpub;
  privateKey = await generatePrivateKeyFromMnemonic(
    Currency[Cur],
    true,
    wallet.mnemonic,
    0
  );
  // console.log("privateKey", privateKey);

  // console.log("pub_key", pub_key);
  try {
    const address = await generateAddressFromXPub(
      Currency[Cur],
      true,
      pub_key,
      0
    );
    // console.log("address", address, Cur);
    return { address, pub_key, privateKey };
  } catch (error) {
    console.log("error123", error);
  }
};
