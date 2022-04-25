import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchUserData from '../back-end-request/fetchUserData';

const MyOffice = () => {
  const dispatch = useDispatch();
  const userData = useSelector(({ userDataReduser }) => userDataReduser);
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    dispatch(fetchUserData(cookie));
  }, [cookie]);

  return (
    <div className="main-page">
      <div>
        {userData ? (
          <div>
            <p>Логін: {userData.login}</p>
            <p>Імя: {userData.name}</p>
            <p>Прізвище: {userData.secondname}</p>
            <p>Email: {userData.email}</p>
            <p>Прізвище: {userData.phone}</p>
          </div>
        ) : (
          <Link to="/user-login">Потрібна авторизація</Link>
        )}
      </div>
    </div>
  );
};

export default MyOffice;
