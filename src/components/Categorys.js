import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../redux/actions/categorys';

function Categorys() {
  const dispatch = useDispatch();
  const categorys = useSelector(({ categorys }) => {
    return {
      categoryArr: categorys.categorysName,
    };
  });

  React.useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div className="main-page">
      <div className="categorys__items">
        {categorys.categoryArr.map((cat, index) => {
          return (
            <div key={index} className="category__item">
              <p>{cat.Category}</p>
              <img src={cat.Img_category} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categorys;
