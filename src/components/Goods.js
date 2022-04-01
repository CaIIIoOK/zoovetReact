import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from './Pagination';
import { actionAddToCart } from '../redux/actions/cart';

function Goods() {
  const dispatch = useDispatch();
  const getGoods = useSelector(({ getGoods }) => getGoods.goods);
  function addToCart(id, price, name, img) {
    const objProd = {
      id,
      price,
      name,
      img,
    };
    dispatch(actionAddToCart(objProd));
  }
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
                  <button
                    className="btn-to-cart"
                    onClick={() =>
                      addToCart(item.id, item.Price_prod, item.Name_prod_ua, item.Img_prod)
                    }>
                    В корзину
                  </button>
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
