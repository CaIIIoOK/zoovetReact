import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../redux/actions/categorys';
import { NavLink } from 'react-router-dom';

function Categorys() {
  const dispatch = useDispatch();
  const categorys = useSelector(({ categorys }) => categorys.categorysName);

  React.useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div className="main-page">
      <div className="categorys__items">
        {categorys.map((cat, index) => {
          return (
            <div key={index} className="category__item">
              <NavLink to={'/cat?id=' + cat.ID_category}>
                <p>{cat.Category}</p>
                <img src={cat.Img_category} alt="category" />
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categorys;
