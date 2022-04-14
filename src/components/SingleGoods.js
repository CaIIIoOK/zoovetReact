import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';
import { actionAddToCart } from '../redux/actions/cart';
import { addToCartStatus } from '../redux/actions/goods';
import DOMPurify from 'dompurify';

const SingleGoods = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { goods, isLoaded } = useSelector(({ getGoods }) => getGoods);

  React.useEffect(() => {
    let id = searchParams.get('id');
    dispatch(fetchGoodsSoloItem(id));
  }, []);
  function addToCart(id, price, name, img, quantity) {
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
  return (
    <div className="main-page">
      {goods.map((item) => {
        const cleanHTML = DOMPurify.sanitize(item.Description);
        return (
          <div className="goods-item" key={item.id}>
            <div className="img-name-block">
              <img src={item.Img_prod} alt="Img_prod" />
              <p>{item.Name_prod_ua}</p>
              <p>
                Ціна: <b>{item.Price_prod}</b> грн.
              </p>
              <div className="btn-availability solo">
                <span>{item.availability === 1 ? 'Є в наявності' : 'Немає в наявності'}</span>
                <button
                  className="btn-to-cart"
                  onClick={() =>
                    addToCart(item.id, item.Price_prod, item.Name_prod_ua, item.Img_prod, 1)
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
            <div className="goods-description">
              <p dangerouslySetInnerHTML={{ __html: cleanHTML }}></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleGoods;
