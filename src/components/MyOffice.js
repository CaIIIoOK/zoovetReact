import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ChangePasswordBlock from './ChangePasswordBlock';
import MyOrders from './MyOrders';
import { setPassModalStatus } from '../redux/actions/setUserDataAction';
import fetchUserData from '../back-end-request/fetchUserData';
import fetchChangeUserData from '../back-end-request/fetchChangeUserData';
import AdminOrders from './AdminOrders';

const MyOffice = () => {
  const dispatch = useDispatch();
  const { name, secondname, email, phone, login, permission } = useSelector(
    ({ userDataReduser }) => userDataReduser,
  );

  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    dispatch(fetchUserData(cookie));
  }, []);

  const setValueInput = (e) => {
    if (e.target.parentElement.children[0].name === 'phone') {
      e.target.style.display = 'none';
      e.target.previousSibling.type = 'tel';
      e.target.parentElement.lastChild.style.display = 'inline';
    } else {
      e.target.style.display = 'none';
      e.target.previousSibling.type = 'text';
      e.target.parentElement.lastChild.style.display = 'inline';
    }
  };

  const applyChange = (e) => {
    const MySwal = withReactContent(Swal);
    if (
      name === e.target.parentElement.children[0].value ||
      secondname === e.target.parentElement.children[0].value ||
      email === e.target.parentElement.children[0].value ||
      phone === e.target.parentElement.children[0].value
    ) {
      e.target.style.display = 'none';
      e.target.parentElement.children[0].type = 'button';
      e.target.parentElement.children[1].style.display = 'inline';
      return;
    }
    let dataArr = [
      e.target.parentElement.children[0].name,
      e.target.parentElement.children[0].value,
      login,
      cookie,
    ];
    if (dataArr[1] === '' || dataArr[1].length < 2) {
      return MySwal.fire({
        title: 'Виникла помилка, поле не заповнене',
        icon: 'error',
        confirmButtonText: 'Ок',
      });
    }
    if (dataArr[0] === 'email') {
      if (
        !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(dataArr[1])
      ) {
        return MySwal.fire({
          title: 'Введіть коректний "Email"',
          icon: 'error',
          confirmButtonText: 'Ок',
        });
      }
    }
    e.target.style.display = 'none';
    e.target.parentElement.children[0].type = 'button';
    e.target.parentElement.children[1].style.display = 'inline';
    dispatch(fetchChangeUserData(dataArr));
    dispatch(fetchUserData(cookie));
  };

  const showChangePassword = (e) => {
    e.preventDefault();
    dispatch(setPassModalStatus(true));
    let scrollWidth = window.innerWidth - document.querySelector('body').offsetWidth;
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('body').style.paddingRight = scrollWidth + 'px';
  };

  return (
    <div className="main-page">
      <div className="My-office-page">
        {permission === 'admin' ? <AdminOrders /> : <MyOrders />}
        <div className="my-data">
          <p>Дані користувача:</p>
          {login !== '' ? (
            <form className="form-my-data">
              <i>Логін: {login}</i>
              <label>
                Ім'я:
                <input type="button" name="name" defaultValue={name} />
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
                <input type="button" name="usersecondname" defaultValue={secondname} />
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
                <input type="button" name="email" defaultValue={email} />
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
                <input type="button" name="phone" pattern="[+0-9]{13}" defaultValue={phone} />
                <img src="./img/icon-edit.png" alt="" onClick={(e) => setValueInput(e)} />
                <img
                  src="./img/icon-galochka.png"
                  alt=""
                  id="galochka"
                  onClick={(e) => applyChange(e)}
                />
              </label>
              <button className="button-myoffice" onClick={(e) => showChangePassword(e)}>
                Змінити пароль
              </button>
              <ChangePasswordBlock />
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
