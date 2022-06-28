import React from 'react';
import { Link } from 'react-router-dom';

import fetchCategory from '../back-end-request/fetchCategory';
import fetchChangeCategory from '../back-end-request/fetchChangeCategory';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCategoryId, setCurrentPage } from '../redux/actions/goods';
import fetchUserData from '../back-end-request/fetchUserData';

const AdminChangeCategory = () => {
  const dispatch = useDispatch();
  const { categorysName } = useSelector(({ categorys }) => categorys);
  const [showCategoryInput, setShowCategoryInput] = React.useState(false);
  const { permission } = useSelector(({ userDataReduser }) => userDataReduser);

  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchUserData(cookie));
  }, [dispatch]);

  function setCategoryIdAndPage(cat) {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(cat));
  }

  const aplyChangeCategory = (id, event) => {
    if (event.target.previousElementSibling.value === '' || id === '') {
      alert('Поле не може бути пустим');
      return;
    }
    let conf = window.confirm('Ви впевнені?');
    if (conf) {
      dispatch(fetchChangeCategory(id, event.target.previousElementSibling.value));
    } else {
      return;
    }
  };

  return (
    <>
      {permission === 'admin' ? (
        <div className="category_admin_items">
          <button
            className="category_admin_redact_button"
            onClick={() => setShowCategoryInput(!showCategoryInput)}>
            {showCategoryInput === false ? 'Змінити категорї' : 'Відміна'}
          </button>
          {categorysName.map((cat) => {
            return (
              <div
                key={cat.ID_category}
                className="category_admin_item"
                onClick={() => setCategoryIdAndPage(cat.ID_category)}>
                <NavLink to={'/admin-goods?cat-id=' + cat.ID_category}>
                  <p>{cat.Category_UA}</p>
                </NavLink>
                {showCategoryInput && (
                  <>
                    <input defaultValue={cat.Category_UA} />
                    <button
                      className="category_admin_redact_button"
                      onClick={(e) => aplyChangeCategory(cat.ID_category, e)}>
                      Змінити назву
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <Link to="/user-login">Потрібна авторизація</Link>
      )}
    </>
  );
};

export default AdminChangeCategory;
