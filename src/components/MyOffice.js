import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import fetchUserData from '../back-end-request/fetchUserData';
import fetchChangeUserData from '../back-end-request/fetchChangeUserData';

const MyOffice = () => {
  const dispatch = useDispatch();
  const userData = useSelector(({ userDataReduser }) => userDataReduser);
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    dispatch(fetchUserData(cookie));
  }, [cookie]);

  const setValueInput = (e) => {
    e.target.style.display = 'none';
    e.target.previousSibling.type = 'text';
    e.target.parentElement.lastChild.style.display = 'inline';
  };

  // const applyDataChange = (e) => {
  //   e.preventDefault();
  //   let data = {
  //     login: formRef.current.elements.login.value,
  //     password: formRef.current.elements.pass.value,
  //     name: formRef.current.elements.name.value,
  //     secondname: formRef.current.elements.secondname.value,
  //     email: formRef.current.elements.email.value,
  //     phone: formRef.current.elements.phone.value,
  //     cookie,
  //   };
  //   let tempData = Object.values(data);
  //   console.log(
  //     tempData.find((elem) => {
  //       return elem === '';
  //     }),
  //   );

  //     dispatch(fetchChangeUserData(data));

  // };
  const applyChange = (e) => {
    let newInputValue = e.target.parentElement.children[0].value;
    if (newInputValue === '' || newInputValue.length < 2 || typeof newInputValue !== 'string') {
      return alert('error');
    } else {
      e.target.style.display = 'none';
      e.target.parentElement.children[0].type = 'button';
      e.target.parentElement.children[1].style.display = 'inline';
    }
  };
  return (
    <div className="main-page">
      <div className="My-office-page">
        <div className="my-data">
          <p>Дані користувача:</p>
          {userData ? (
            <form className="form-my-data">
              <label>
                Логін:
                <input type="button" name="login" defaultValue={userData.login} readOnly />
              </label>
              <label>
                Пароль:
                <input type="password" name="pass" defaultValue={userData.pass} />
                <img src="./img/icon-edit.png" alt="" onClick={(e) => setValueInput(e)} />
                <img
                  src="./img/icon-galochka.png"
                  alt=""
                  id="galochka"
                  onClick={(e) => applyChange(e)}
                />
              </label>
              <label>
                Ім'я:
                <input type="button" name="name" defaultValue={userData.name} />
                <img src="./img/icon-edit.png" alt="" onClick={(e) => setValueInput(e)} />
                <img
                  src="./img/icon-galochka.png"
                  alt=""
                  id="galochka"
                  onClick={(e) => applyChange(e)}
                />
              </label>
              <label>
                Прізвище:
                <input type="button" name="secondname" defaultValue={userData.secondname} />
                <img src="./img/icon-edit.png" alt="" onClick={(e) => setValueInput(e)} />
                <img
                  src="./img/icon-galochka.png"
                  alt=""
                  id="galochka"
                  onClick={(e) => applyChange(e)}
                />
              </label>
              <label>
                Email:
                <input type="button" name="email" defaultValue={userData.email} />
                <img src="./img/icon-edit.png" alt="" onClick={(e) => setValueInput(e)} />
                <img
                  src="./img/icon-galochka.png"
                  alt=""
                  id="galochka"
                  onClick={(e) => applyChange(e)}
                />
              </label>
              <label>
                Номер телефону:
                <input type="button" name="phone" defaultValue={userData.phone} />
                <img src="./img/icon-edit.png" alt="" onClick={(e) => setValueInput(e)} />
                <img
                  src="./img/icon-galochka.png"
                  alt=""
                  id="galochka"
                  onClick={(e) => applyChange(e)}
                />
              </label>

              <div className="button-block">
                <button className="button-myoffice">
                  <b>Внести зміни</b>
                </button>
              </div>
            </form>
          ) : (
            <Link to="/user-login">Потрібна авторизація</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOffice;
