import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registration } from '../back-end-req/request';

const Registration = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => {
    registration(data);
  };

  return (
    <div className="main-page">
      <div className="registration-form">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form_control">
            <label htmlFor="userlogin">
              Логін <span>(буде використовуватись для входу в кабінет)</span>
            </label>
            <hr />
            <input
              type="text"
              id="userlogin"
              placeholder="Введіть свій Логін"
              {...register('userlogin', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 5,
                  message: 'Мінімум 5 латинських символів',
                },
                maxLength: {
                  value: 16,
                  message: 'Забагато символів',
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*?([-_][a-z0-9]+){0,2}$/i,
                  message: 'Введіть коректний Login',
                },
              })}
            />
            <div className="error-input">
              {errors?.userlogin && <p>{errors?.userlogin?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="userpassword">
              Пароль
              <span className="help-pass">
                ?
                <p className="help-text">
                  Пароль повинен містити мінімум 6 латинських символів, хочаб одну велику букву та
                  цифру.
                </p>
              </span>
            </label>
            <hr />
            <input
              type="password"
              id="userpassword"
              placeholder="Введіть свій пароль"
              {...register('userpassword', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 6,
                  message: 'Мінімум 6 символів',
                },
                maxLength: {
                  value: 16,
                  message: 'Забагато символів',
                },
                pattern: {
                  value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g,
                  message: 'Введіть коректний пароль',
                },
              })}
            />
            <div className="error-input">
              {errors?.userpassword && <p>{errors?.userpassword?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="username">Ім'я</label>
            <hr />
            <input
              type="text"
              id="username"
              placeholder="Ім'я"
              {...register('username', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 2,
                  message: 'Мінімум 2 символів',
                },
                maxLength: {
                  value: 16,
                  message: 'Забагато символів',
                },
              })}
            />
            <div className="error-input">
              {errors?.username && <p>{errors?.username?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="usersecondname">Прізвище</label>
            <hr />
            <input
              type="text"
              id="usersecondname"
              placeholder="Введіть своє прізвище "
              {...register('usersecondname', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 2,
                  message: 'Мінімум 2 символів',
                },
                maxLength: {
                  value: 16,
                  message: 'Забагато символів',
                },
              })}
            />
            <div className="error-input">
              {errors?.usersecondname && <p>{errors?.usersecondname?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="phone">Телефон</label>
            <hr />
            <input
              type="tel"
              id="phone"
              placeholder="+380505555555"
              {...register('phone', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 5,
                  message: 'Мінімум 5 символів',
                },
                maxLength: {
                  value: 16,
                  message: 'Забагато символів',
                },
              })}
            />
            <div className="error-input">
              {errors?.phone && <p>{errors?.phone?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <hr />
            <input
              type="text"
              id="email"
              placeholder="email@example.com"
              {...register('email', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 5,
                  message: 'Мінімум 5 символів',
                },
                maxLength: {
                  value: 20,
                  message: 'Забагато символів',
                },
                pattern: {
                  value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                  message: 'Введіть коректний Email',
                },
              })}
            />
            <div className="error-input">
              {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <input
              type="checkbox"
              {...register('check', {
                required: 'Ви не прийняли умови',
              })}
            />
            <div className="error-input">
              {errors?.check && <p>{errors?.check?.message || 'Error'}</p>}
            </div>
            <span>
              Я приймаю{' '}
              <Link exact="true" to="/conditions" className="nav-link">
                умови
              </Link>{' '}
              регістрації
            </span>
          </div>
          <button className="btn-registration" disabled={!isValid}>
            зареєструватись
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
