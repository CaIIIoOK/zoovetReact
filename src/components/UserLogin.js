import React from 'react';
import fetchUserLogining from '../back-end-request/fetchUserLogining';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const loginRef = React.useRef();
  const passRef = React.useRef();
  const dispatch = useDispatch();
  const userData = useSelector(({ userDataReduser }) => userDataReduser);

  const authorization = (e) => {
    e.preventDefault();
    let data = {
      login: loginRef.current.value,
      pass: passRef.current.value,
    };
    dispatch(fetchUserLogining(data));
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
            <button className="btn-login" onClick={(e) => authorization(e)}>
              Увійти
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Ласкаво просимо</p>
          <Link to="/my-office">Перейти до особистого кабінету</Link>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
