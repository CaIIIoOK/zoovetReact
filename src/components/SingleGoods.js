import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';
import { actionAddToCart } from '../redux/actions/cart';
import { addToCartStatus } from '../redux/actions/goods';
import DOMPurify from 'dompurify';
import fetchChangeProdData from '../back-end-request/fetchChangeProdData';
import fetchUserData from '../back-end-request/fetchUserData';

const SingleGoods = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { goods } = useSelector(({ getGoods }) => getGoods);
  const [prodToInput, setProdToInput] = React.useState(false);
  const { permission } = useSelector(({ userDataReduser }) => userDataReduser);

  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    let id = searchParams.get('id');
    dispatch(fetchGoodsSoloItem(id));
    if (cookie !== '') {
      dispatch(fetchUserData(cookie));
    }
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
  const changeProd = () => {
    setProdToInput(!prodToInput);
    let id = searchParams.get('id');
    dispatch(fetchGoodsSoloItem(id));
  };
  const applyChanges = (e, id) => {
    e.preventDefault();
    const prodData = {
      id,
      cookie,
      img: e.target.form[0].value,
      name: e.target.form[1].value,
      price: e.target.form[2].value,
      availability: e.target.form[3].value,
      description: e.target.form[4].value,
    };
    let conf = window.confirm('Ви впевнені?');
    if (conf) {
      dispatch(fetchChangeProdData(prodData));
    } else {
      return;
    }
  };
  return (
    <div className="main-page">
      {goods.map((item) => {
        const cleanHTML = DOMPurify.sanitize(item.Description_UA);
        if (!prodToInput) {
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
                  {permission === 'admin' ? (
                    <button className="redact-btn" onClick={changeProd}>
                      Редагувати товар
                    </button>
                  ) : (
                    ''
                  )}
                  <button
                    className="btn-to-cart"
                    disabled={item.availability === 1 ? false : true}
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
        } else {
          return (
            <div className="redact-prod" key={item.id}>
              <form>
                <label htmlFor="img">
                  Силка на картинку:
                  <input defaultValue={item.Img_prod} type="text" name="img" />
                  <img
                    src={item.Img_prod}
                    alt=""
                    style={{ width: '50px', position: 'absolute', right: '-50px' }}
                  />
                </label>
                <label htmlFor="nameProd">
                  Назва товару:
                  <input defaultValue={item.Name_prod_ua} type="text" name="nameProd" />
                </label>
                <label htmlFor="price">
                  Ціна:
                  <input defaultValue={item.Price_prod} type="text" name="price" />
                </label>
                <label htmlFor="availability">
                  Наявність:
                  <input defaultValue={item.availability} type="text" name="availability" />
                </label>
                <label htmlFor="description">
                  Опис:
                  <textarea defaultValue={item.Description_UA} type="text" name="description" />
                </label>
                <div className="butonst-admin">
                  <button className="redact-btn" onClick={changeProd}>
                    Показати товар
                  </button>
                  <button
                    className="redact-btn btn-apply"
                    onClick={(e) => applyChanges(e, item.id)}>
                    Прийняти зміни
                  </button>
                </div>
              </form>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SingleGoods;
