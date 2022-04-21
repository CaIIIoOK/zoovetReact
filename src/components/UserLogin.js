import React from 'react';
import fetchValidationHash from '../back-end-request/fetchValidationHash';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const loginRef = React.useRef();
  const passRef = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authorization = async (e) => {
    e.preventDefault();
    let data = {
      login: loginRef.current.value,
      pass: passRef.current.value,
    };
    dispatch(fetchValidationHash(data));
    navigate('/my-office', { replace: true });
  };

  return (
    <div className="main-page">
      <div className="login">
        <form action="#" onSubmit={authorization}>
          <label htmlFor="userlogin">Логін</label>
          <input type="text" id="userlogin" placeholder="Введіть свій Логін" ref={loginRef} />
          <label htmlFor="userpassword">Пароль</label>
          <input
            type="password"
            id="userpassword"
            placeholder="Введіть свій пароль"
            ref={passRef}
          />
          <button className="btn-login">Увійти</button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
