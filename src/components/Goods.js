import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Pagination from './Pagination';
import { actionAddToCart } from '../redux/actions/cart';
import { addToCartStatus } from '../redux/actions/goods';
import LoadingGoods from './LoadingGoods';
import { goodsDisplay } from '../redux/actions/goods';
import { cartOpen } from '../redux/actions/cartStatus';

function Goods() {
  const dispatch = useDispatch();
  const { goods, isLoaded, totalCount } = useSelector(({ getGoods }) => getGoods);
  const selectRef = React.useRef();

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

  function sortGoods() {
    if (selectRef.current.value === 'byTopPrice') {
      dispatch(
        goodsDisplay(
          goods.sort((a, b) => b.Price_prod - a.Price_prod),
          totalCount,
        ),
      );
    }
    if (selectRef.current.value === 'byLowPrice') {
      dispatch(
        goodsDisplay(
          goods.sort((a, b) => a.Price_prod - b.Price_prod),
          totalCount,
        ),
      );
    }
    if (selectRef.current.value === 'byAvailability') {
      dispatch(
        goodsDisplay(
          goods.sort((a, b) => b.availability - a.availability),
          totalCount,
        ),
      );
    }
    if (selectRef.current.value === 'reset') {
      dispatch(
        goodsDisplay(
          goods.sort((a, b) => a.id - b.id),
          totalCount,
        ),
      );
    }
  }

  function toggleCartOpen(e) {
    e.stopPropagation();
    dispatch(cartOpen(true));
    let scrollWidth = window.innerWidth - document.querySelector('body').offsetWidth;
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('body').style.paddingRight = scrollWidth + 'px';
  }

  return (
    <div className="main-page">
      <select name="" id="sort-goods" ref={selectRef} onChange={sortGoods}>
        <option hidden>Сортувати</option>
        <option value="byTopPrice">Від дорогих до дешевих</option>
        <option value="byLowPrice">Від дешевих до дорогих</option>
        <option value="byAvailability">Є в наявності</option>
        <option value="reset">По замовчуванні</option>
      </select>
      <div className="products__items">
        {isLoaded
          ? goods.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    item.availability === 1 ? 'products__item' : 'products__item availability'
                  }>
                  <NavLink to={'/goods-solo?&id=' + item.id}>
                    <img src={item.Img_prod} alt="Img_prod" />
                    <div className="price-name-price">
                      <p>
                        Ціна: <b>{item.Price_prod}</b> грн.
                      </p>
                      <p>{item.Name_prod_ua}</p>
                      <span>Код товару: {item.Product_code}</span>
                    </div>
                  </NavLink>
                  <div className="btn-availability">
                    <span>{item.availability === 1 ? 'Є в наявності' : 'Немає в наявності'}</span>
                    <button
                      className="btn-to-cart"
                      disabled={item.availability === 1 ? false : true}
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
                          onClick={(e) => toggleCartOpen(e)}
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
