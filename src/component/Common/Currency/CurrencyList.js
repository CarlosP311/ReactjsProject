import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import {
  currencyPriceDetail,
  getBalance,
  getErc20Balance,
  clearBalance,
} from "../../../store/slice/balanceSlice";
import CurrencyBlock from "./CurrencyBlock";
import { getCoinChart } from "../../../store/slice/chartSlice";
import { getCoinMarketDetail } from "../../../store/slice/coinMarketSlice";

export const CurrencyList = ({ nav, setTotalBalance, updateBalance }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const [balanceArr, setBalanceArr] = useState([]);
  // const [temp, setTemp] = useState(false);

  const currency = localStorage.getItem("currency");
  const cryptoCoins = JSON.parse(localStorage.getItem("checkCrypto"));
  // console.log("cryptoCoins", cryptoCoins);
  const userCurrency = JSON.parse(
    localStorage.getItem("user_crypto_currency_data")
  );
  // console.log("userCurrency", userCurrency, cryptoCoins);

  const coinName = cryptoCoins
    ?.map((item, i) => item.coingecko_coin_name)
    .toString();

  const balance = useSelector((state) => state.balance.balance);

  const erc20Balance = useSelector((state) => state.balance.erc20Balance);

  const coinBalance = [...balance, ...erc20Balance];
  // console.log("coinBalance", coinBalance, "bal", balance, "erc", erc20Balance);
  const currencyVal = useSelector((state) => state.balance.currencyPrice);
  // console.log("currencyVal", currencyVal);

  useEffect(() => {
    dispatch(currencyPriceDetail({ coins: coinName, currency: currency }));
    ref.current = true;
  }, [dispatch, currency]);

  useEffect(() => {
    let total = 0;

    if (coinBalance.length === cryptoCoins.length) {
      for (let i = 0; i < coinBalance.length; i++) {
        if (!coinBalance[i]) {
          continue;
        } else {
          total += coinBalance[i].fiat_balance;
        }
      }
    }

    updateBalance && setTotalBalance(total);
  }, [coinBalance, cryptoCoins, erc20Balance, updateBalance, currencyVal]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    dispatch(clearBalance());

    if (currencyVal && ref.current) {
      // setTimeout(() => {
      for (let i = 0; i < cryptoCoins.length; i++) {
        if (!cryptoCoins[i].is_erc20) {
          dispatch(
            getBalance({
              coin_type: cryptoCoins[i]?.coin_type,
              address: userCurrency[cryptoCoins[i].currency]?.address,
              coin: cryptoCoins[i]?.tatum_coin_name,
            })
          );
        } else {
          dispatch(
            getErc20Balance({
              address: userCurrency[cryptoCoins[i]?.currency]?.address,
              contract_address: cryptoCoins[i]?.contract_address,
              testnet_type: cryptoCoins[i]?.testnet_type,
              token: cryptoCoins[i]?.currency,
              digits: cryptoCoins[i]?.digits,
              coin: cryptoCoins[i]?.coin_name,
            })
          );
        }
      }
      ref.current = false;
      // }, 1500);
    }
  }, [currencyVal]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTemp(false);
  //   }, 3000);
  // }, [window]);

  useEffect(() => {
    let balanceArray = [];
    if (currencyVal && cryptoCoins.length === coinBalance.length) {
      cryptoCoins?.forEach((obj, i) => {
        balanceArray.push({
          id: i + 1,
          image: obj.image,
          coingecko_coin_name: obj.coingecko_coin_name,
          is_erc20: obj.is_erc20,
          name: obj.currency,
          balance: obj.is_erc20
            ? erc20Balance?.filter(
                (item) => item?.name === obj.display_currency
              )[0]
            : balance?.filter((item) => item?.name === obj.display_currency)[0],
          updown: "+12,5%",
          class: "zl_add_bitcoin_currency",
        });
        return true;
      });
      // if (!temp) {
      setBalanceArr(balanceArray);
      // }
      // if (
      //   balanceArray.length === cryptoCoins.length &&
      //   balanceArray.length > 0
      // ) {
      //   setTemp(true);
      //   return;
      // }
    }
  }, [currencyVal, balance, erc20Balance]);

  // console.log("balanceArray", balanceArr, cryptoCoins);

  const date = +new Date().getTime();
  const toDate = (date / 1000).toFixed(0);
  const fromDate = toDate - 86400;

  useEffect(() => {
    dispatch(getCoinMarketDetail(coinName));
  }, [dispatch]);

  const coinMarketData = useSelector((state) => state.coinMarket.coinMarket);

  useEffect(() => {
    for (let i = 0; i < cryptoCoins.length; i++) {
      dispatch(
        getCoinChart({
          coin: cryptoCoins[i].coingecko_coin_name,
          from_date: fromDate,
          to_date: toDate,
        })
      );
    }
  }, [dispatch]);

  const chartData = useSelector((state) => state.chart.chartSmall);

  return (
    <>
      {balanceArr?.map((crypto, index) => {
        return (
          <div key={index}>
            {nav ? (
              <Nav.Item className="zl_add_currency_column col" key={index}>
                <Nav.Link
                  eventKey={crypto.name}
                  className="zl_add_currency_inner_content zl_add_bitcoin_currency"
                >
                  {chartData && balanceArr.length > 0 && (
                    <CurrencyBlock
                      coinMarketData={coinMarketData}
                      crypto={crypto}
                      chartData={chartData}
                      key={index}
                    />
                  )}
                </Nav.Link>
              </Nav.Item>
            ) : (
              <div className="zl_add_currency_column col" key={index}>
                <div className="zl_add_currency_inner_content">
                  {chartData && balanceArr.length > 0 && (
                    <CurrencyBlock
                      coinMarketData={coinMarketData}
                      crypto={crypto}
                      chartData={chartData}
                      key={index}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
