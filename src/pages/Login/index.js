import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { loginPageAction } from "../../store/slice/authSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [words, setWords] = useState([]); // already created account 12 words observe dance pledge catch gun tuna head sort salute giggle gown resource
  const [err, setErr] = useState("");

  // console.log("words", words);

  const onchangeHandler = (e, i) => {
    setErr("");
    const newArr = [...words];

    newArr[i] = e.target.value.trim();

    setWords(newArr);
  };

  const validate = () => {
    let valid = false;
    if (words.length < 12) {
      setErr("Please enter valid 12 words of mnemonics for Login App");
    } else {
      valid = true;
    }
    return valid;
  };

  const loginHandler = () => {
    if (validate()) {
      dispatch(
        loginPageAction({
          params: words.join(" "),
          cb: (err, response) => {
            if (err) {
              console.log("err", err);
            }
            if (response) {
              navigate(routes.dashboardPage);
            }
          },
        })
      );
    }
  };

  return (
    <section className="zl_login_section">
      <div className="zl_login_content container">
        <div className="zl_login_heading_text">
          <h3 className="zl_login_heading">Login</h3>
          <p className="zl_login_peregraph">
            Login De-crypto app with your secret words.
          </p>
        </div>
        <div className="zl_login_row row">
          {Array(12)
            .fill("input")
            .map((inputValue, i) => (
              <div className="zl_login_col_3 col-lg-3 col-md-6" key={i}>
                <div className="zl_login_input_content position-relative">
                  <p className="zl_login_input_text">{i + 1}</p>
                  <input
                    type="text"
                    className="zl_login_input"
                    name={`input${i + 1}`}
                    onChange={(e) => onchangeHandler(e, i)}
                    placeholder="________"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="zl_login_btn">
          {err && <span className="err_text">{err}</span>}
          <button
            className="mx-auto zl_login_btn_link"
            onClick={() => loginHandler()}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
