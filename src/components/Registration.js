import React from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <div className="main-page">
      <div className="registration-form">
        <form action="">
          <div className="form_control">
            <label htmlFor="userlogin">
              Логін <span>(буде використовуватись для входу в кабінет)</span>
            </label>
            <hr />
            <input type="text" id="userlogin" placeholder="Введіть свій Логін" />
          </div>
          <div className="form_control">
            <label htmlFor="userpassword">
              Пароль<span> (не меньше 6 символів)</span>
            </label>
            <hr />
            <input type="text" id="userpassword" placeholder="Введіть свій пароль" />
          </div>
          <div className="form_control">
            <label htmlFor="username">Ім'я</label>
            <hr />
            <input type="text" id="username" placeholder="Ім'я" />
          </div>
          <div className="form_control">
            <label htmlFor="usersecondname">Прізвище</label>
            <hr />
            <input type="text" id="usersecondname" placeholder="Введіть своє прізвище " />
          </div>
          <div className="form_control">
            <label htmlFor="phone">Телефон</label>
            <hr />
            <input type="text" id="phone" placeholder="+380505555555" />
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <hr />
            <input type="text" id="email" placeholder="email@example.com" />
          </div>
          <div className="form_control">
            <label htmlFor="city">
              Місто <span>(населений пункт)</span>{' '}
            </label>
            <input type="text" id="city" placeholder="Місто" />
          </div>

          <div className="form_control">
            <input type="checkbox" value="1" />
            <span>
              Я приймаю{' '}
              <Link exact="true" to="/conditions" className="nav-link">
                умови
              </Link>{' '}
              регістрації
            </span>
          </div>
          <button className="btn-registration">зареєструватись</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
