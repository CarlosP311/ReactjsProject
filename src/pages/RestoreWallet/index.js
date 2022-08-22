import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HeadingModule from "../../component/Layout/Header";
import { routes } from "../../constants";
import { loginPageAction } from "../../store/slice/authSlice";

const RestoreWallet = () => {
  // const inputField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [words, setWords] = useState([]);
  const [err, setErr] = useState("");

  const onchangeHandler = (e, i) => {
    setErr("");
    const newArr = [...words];

    newArr[i] = e.target.value.trim();
    setWords(newArr);
  };

  const restoreHandler = () => {
    // for (let i = 0; i < 12; i++) {
    //   if (words[i] === (undefined || "")) {
    //     console.log("this is not valid");
    //     return;
    //   }
    // }

    if (words.length === 12) {
      console.log("word", words.join(" "));
      localStorage.removeItem("checkCrypto");
      dispatch(
        loginPageAction({
          params: words.join(" "),
          cb: (err, response) => {
            if (err) {
              console.log("err", err);
            }
            if (response) {
              console.log("response", response);
              navigate(routes.dashboardPage);
            }
          },
        })
      );
    } else {
      setErr(
        "Please enter valid 12 words of mnemonics for Restore your Wallet"
      );
    }
  };

  return (
    <>
      <section className="zl_restore_wallet_page">
        <HeadingModule name={"Restore Wallet"} />
        <div className="zl_restore_wallet_input_content">
          <div className="zl_securebackup_row row">
            {Array(12)
              .fill("input")
              .map((inputValue, i) => (
                <div
                  className="zl_securebackup_col_3 col-lg-3 col-md-6"
                  key={i}
                >
                  <div className="zl_securebackup_input_content position-relative">
                    <p className="zl_securebackup_input_text">{i + 1}</p>
                    <input
                      type="text"
                      className="zl_securebackup_input"
                      name={`input${i + 1}`}
                      onChange={(e) => onchangeHandler(e, i)}
                      placeholder="________"
                    />
                  </div>
                </div>
              ))}
            {/* {inputField.map((inputValue, i) => (
              <div className="zl_securebackup_col_3 col-lg-3 col-md-6" key={i}>
                <div className="zl_securebackup_input_content position-relative">
                  <p className="zl_securebackup_input_text">{inputValue}</p>
                  <input
                    type="text"
                    className="zl_securebackup_input"
                    name={`input${inputValue}`}
                    placeholder="________"
                  />
                </div>
              </div>
            ))} */}
          </div>
          <div className="zl_securebackup_btn">
            {err && <span className="err_text">{err}</span>}
            <Link to={"#"} className="mx-auto" onClick={restoreHandler}>
              Restore
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RestoreWallet;
