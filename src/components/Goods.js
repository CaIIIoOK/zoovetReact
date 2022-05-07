import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Pagination from './Pagination';
import { actionAddToCart } from '../redux/actions/cart';
import { addToCartStatus } from '../redux/actions/goods';
import LoadingGoods from './LoadingGoods';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';

function Goods() {
  const dispatch = useDispatch();
  const { goods, isLoaded } = useSelector(({ getGoods }) => getGoods);

  function addToCart(id, price, name, img, quantity, event) {
    event.stopPropagation();
    const objProd = {
      id,
      price,
      name,
      img,
      quantity,
    };
    dispatch(actionAddToCart(objProd));
    dispatch(addToCartStatus(id));
  }
  function setSoloItem(itemId) {
    dispatch(fetchGoodsSoloItem(itemId));
  }

  return (
    <div className="main-page">
      <div className="products__items">
        {isLoaded
          ? goods.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    item.availability === 1 ? 'products__item' : 'products__item availability'
                  }>
                  <NavLink to={'/goods-solo?&id=' + item.id} onClick={() => setSoloItem(item.id)}>
                    <img src={item.Img_prod} alt="Img_prod" />
                    <div className="price-name-price">
                      <p>
                        Ціна: <b>{item.Price_prod}</b> грн.
                      </p>
                      <p>{item.Name_prod_ua}</p>
                    </div>
                  </NavLink>
                  <div className="btn-availability">
                    <span>{item.availability === 1 ? 'Є в наявності' : 'Немає в наявності'}</span>
                    <button
                      className="btn-to-cart"
                      onClick={(event) =>
                        addToCart(
                          item.id,
                          item.Price_prod,
                          item.Name_prod_ua,
                          item.Img_prod,
                          1,
                          event,
                        )
                      }>
                      В корзину
                      {item.isInCart && (
                        <img
                          src="https://img.icons8.com/material-two-tone/48/000000/shopping-cart--v1.png"
                          alt="cart"
                        />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          : Array(30)
              .fill(0)
              .map((_, index) => <LoadingGoods key={index} />)}
      </div>
      <Pagination />
    </div>
  );
}

export default Goods;
