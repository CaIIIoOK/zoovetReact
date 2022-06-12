import React from 'react';
import fetchCategory from '../back-end-request/fetchCategory';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCategoryId, setCurrentPage } from '../redux/actions/goods';

const AdminChangeProdAll = () => {
  const { categorysName } = useSelector(({ categorys }) => categorys);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  function setCategoryIdAndPage(cat) {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(cat));
  }

  return (
    <>
      <div className="category_admin_items">
        {categorysName.map((cat) => {
          return (
            <div
              key={cat.ID_category}
              className="category_admin_item"
              onClick={() => setCategoryIdAndPage(cat.ID_category)}>
              <NavLink to={'/admin-goods?cat-id=' + cat.ID_category}>
                <p>{cat.Category_UA}</p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminChangeProdAll;
