import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPassModalStatus } from '../redux/actions/setUserDataAction';
import fetchChangePassword from '../back-end-request/fetchChangePassword';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ChangePasswordBlock = () => {
  const dispatch = useDispatch();
  const { passModalStatus, login } = useSelector(({ userDataReduser }) => userDataReduser);
  const [validateValue, setvalidatePass] = React.useState(false);
  const currentPass = React.useRef();
  const newPass1 = React.useRef();
  const newPass2 = React.useRef();
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );

  const closePassMenu = () => {
    dispatch(setPassModalStatus(false));
    document.querySelector('body').style.paddingRight = '0px';
    document.querySelector('body').style.overflow = 'auto';
  };
  const sendChangedPassword = (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    if (currentPass.current.value !== '' || newPass1.current.value !== '') {
      let dataArr = [currentPass.current.value, newPass1.current.value, login, cookie];
      console.log(dataArr);
    } else {
      return MySwal.fire({
        title: 'Поля не заповнені',
        icon: 'error',
        confirmButtonText: 'Ок',
      });
    }
  };
  const validatePass = () => {
    if (newPass1.current.value === newPass2.current.value) {
      setvalidatePass(false);
    } else {
      setvalidatePass(true);
    }
  };
  return (
    <>
      {passModalStatus && (
        <div>
          <div className="passModal">
            <label htmlFor="current">
              Поточний пароль:
              <hr />
              <input type="password" name="current" ref={currentPass} />
            </label>
            <label htmlFor="newPass1">
              Новий пароль:
              <hr />
              <input type="password" name="newPass1" ref={newPass1} onChange={validatePass} />
              {validateValue && <span>Паролі не співпадають</span>}
            </label>
            <label htmlFor="newPass2">
              Повторити новий пароль:
              <hr />
              <input type="password" name="newPass2" ref={newPass2} onChange={validatePass} />
              {validateValue && <span>Паролі не співпадають</span>}
            </label>
            <i className="fas fa-times passClose" onClick={closePassMenu}></i>
            <button
              disabled={validateValue}
              className="button-myoffice"
              onClick={(e) => sendChangedPassword(e)}>
              Змінити пароль
            </button>
          </div>
          <div className="passShadow" onClick={closePassMenu}></div>
        </div>
      )}
    </>
  );
};

export default ChangePasswordBlock;
