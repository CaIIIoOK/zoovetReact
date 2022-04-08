import React from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  return (
    <div className="main-page">
      <div className="login">
        <form action="">
          <label htmlFor="userlogin">Логін</label>
          <input type="text" id="userlogin" placeholder="Введіть свій Логін" />
          <label htmlFor="userpassword">Пароль</label>
          <input type="text" id="userpassword" placeholder="Введіть свій пароль" />
          <Link to="/my-office">
            <button className="btn-login">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
