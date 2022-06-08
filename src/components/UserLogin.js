import React from 'react';
import fetchUserLogining from '../back-end-request/fetchUserLogining';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const UserLogin = () => {
  const loginRef = React.useRef();
  const passRef = React.useRef();
  const dispatch = useDispatch();
  const userData = useSelector(({ userDataReduser }) => userDataReduser);
  const [btnAct, setBtnAct] = React.useState(true);

  const authorization = (e) => {
    e.preventDefault();
    let data = {
      login: loginRef.current.value,
      pass: passRef.current.value,
    };
    dispatch(fetchUserLogining(data));
  };
  const onChange = () => {
    setBtnAct(false);
  };
  return (
    <div className="main-page">
      {!userData.login ? (
        <div className="login">
          <form action="">
            <label htmlFor="userlogin">Логін</label>
            <input type="text" id="userlogin" placeholder="Введіть свій Логін" ref={loginRef} />
            <label htmlFor="userpassword">Пароль</label>
            <input
              type="password"
              id="userpassword"
              placeholder="Введіть свій пароль"
              ref={passRef}
            />
            <button className="btn-login" disabled={btnAct} onClick={(e) => authorization(e)}>
              Увійти
            </button>
            <div className="recaptcha">
              <ReCAPTCHA sitekey="6LfM1vQfAAAAAMAbY7Cp0oBzVJbXTcj-ThZ8prpE" onChange={onChange} />
            </div>
          </form>
        </div>
      ) : (
        <div className="userIn">
          <p>Ласкаво просимо :)</p>
          <Link to="/my-office">
            <button>
              Перейти до особистого кабінету <i className="fas fa-user-circle"></i>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
