import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCategory from '../back-end-request/fetchCategory';
import { setCategoryId, setCurrentPage } from '../redux/actions/goods';
import { NavLink } from 'react-router-dom';
import LoadingCategory from './LoadingCategory';

function Categorys() {
  const dispatch = useDispatch();
  const { categorysName, isLoaded } = useSelector(({ categorys }) => categorys);

  React.useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  function setCategoryIdAndPage(cat) {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(cat));
  }

  return (
    <div className="main-page">
      <div className="categorys__items">
        {isLoaded
          ? categorysName.map((cat) => {
              return (
                <div
                  key={cat.ID_category}
                  className="category__item"
                  onClick={() => setCategoryIdAndPage(cat.ID_category)}>
                  <NavLink to={'/goods?cat-id=' + cat.ID_category}>
                    <p>{cat.Category_UA}</p>
                    <img src={cat.Img_category} alt="category" />
                  </NavLink>
                </div>
              );
            })
          : Array(25)
              .fill(0)
              .map((_, index) => <LoadingCategory key={index} />)}
      </div>
    </div>
  );
}

export default Categorys;
