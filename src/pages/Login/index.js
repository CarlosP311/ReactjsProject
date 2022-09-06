import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { createWalletAction } from "../../store/slice/authSlice";
import bcrypt from 'bcryptjs';
import Spinner from "react-bootstrap/Spinner";
import "./css/Style.css"

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  // console.log("words", words);
  // console.log(localStorage)

  const loginHandler = () => {
    let savedPassword = localStorage.getItem('password');
    bcrypt.compare(password, savedPassword)
      .then(isCorrect => {
        if (isCorrect) {
          // console.log('mnemonics', localStorage?.getItem('mnemonics'))
          dispatch(
            createWalletAction({
              params: JSON.parse(localStorage?.getItem('mnemonics')),
              password: password,
              cb: (err, response) => {
                if (err) {
                  console.log("err", err);
                }
                if (response) {
                  navigate(routes.dashboardPage);
                }
              }
            })
          )
        } else {
          setErr('Wrong password!');
        }
      });
  }

  let loader = useSelector((state) => state.auth.loader);
  if (loader)
    return (
      <div><Spinner animation="border" variant="primary" /></div>
    );
  return (
    <section className="zl_login_section">
      <div className="zl_login_content container">
        <div className="zl_login_heading_text">
          <br /><br /><br />
          <h1 className="zl_login_heading">Login</h1>
          {/* <p className="zl_login_peregraph">
            Login De-crypto app with your secret words.
          </p> */}
        </div>
        <br /><br /><br />
        <div className = "container">
          <div className = "container__item">
            <form className ="form__item">
              <input type="password" className = "form__field" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setErr(''); }}/>
              {err}
              <button type="button" className = "btn__login_ btn--primary btn--inside uppercase" onClick={loginHandler}>Login</button>
            </form>
          </div>
          <br /><br />
          <div className = "container__item container__item--bottom">
            <p><Link to={routes.signupPage}>Create new wallet</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
