import axios from "axios";

export const authHeadersTatum = (testType) => {
  if (testType === "rinkeby") {
    return {
      headers: {
        "x-testnet-type": "ethereum-rinkeby",
        "x-api-key": process.env.REACT_APP_TATUM_API_KEY,
      },
    };
  }
  return {
    headers: {
      "x-api-key": process.env.REACT_APP_TATUM_API_KEY,
    },
  };
};

const AxiosTatum = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_TATUM}`,
});

export default AxiosTatum;
