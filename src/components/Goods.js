import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';

function Goods() {
  const { getGoods } = useSelector(({ getGoods }) => {
    return {
      getGoods: getGoods.goods,
    };
  });
  return (
    <div className="main-page">
      <Pagination />
      <div className="products__items">
        {getGoods.map((item) => {
          return (
            <div key={item.id} className="products__item">
              <img src={item.Img_prod} alt="Img_prod" />
              <div className="price-name">
                <p>Ціна: {item.Price_prod} грн.</p>
                {item.Name_prod_ua}
                <div className="btn-availability">
                  <span>{item.availability === 1 ? 'Є в наявності' : 'Немає в наявності'}</span>
                  <button className="btn-to-cart">В корзину</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination />
    </div>
  );
}

export default Goods;
