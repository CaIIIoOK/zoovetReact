import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const MyOffice = () => {
  const { name } = useSelector(({ userDataReduser }) => userDataReduser);

  return (
    <div className="main-page">
      <div>
        {name ? (
          <div> Успех вае имя {name}</div>
        ) : (
          <Link to="/user-login">Потрібна авторизація</Link>
        )}
      </div>
    </div>
  );
};

export default MyOffice;
