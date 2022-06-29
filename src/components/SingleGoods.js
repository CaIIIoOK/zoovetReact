import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';
import { actionAddToCart } from '../redux/actions/actionsCart';
import { addToCartStatus } from '../redux/actions/goods';
import DOMPurify from 'dompurify';
import fetchChangeProdData from '../back-end-request/fetchChangeProdData';
import fetchUserData from '../back-end-request/fetchUserData';
import Reviews from './Reviews';
import fetchCategory from '../back-end-request/fetchCategory';

const SingleGoods = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { singleGoods } = useSelector(({ getGoods }) => getGoods);
  const { categorysName } = useSelector(({ categorys }) => categorys);
  const [prodToInput, setProdToInput] = React.useState(false);
  const { permission } = useSelector(({ userDataReduser }) => userDataReduser);
  const idQuery = searchParams.get('id');
  const changeProdForm = React.useRef();

  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    dispatch(fetchGoodsSoloItem(idQuery));
    dispatch(fetchCategory());
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
    dispatch(fetchGoodsSoloItem(idQuery));
  };
  const applyChanges = (id, e) => {
    e.preventDefault();
    if (
      changeProdForm.current.img.value === '' ||
      changeProdForm.current.name.value === '' ||
      changeProdForm.current.price.value === '' ||
      changeProdForm.current.availability.value === '' ||
      changeProdForm.current.description.value === ''
    ) {
      alert('Усі поля повинні бути заповнені');
      return;
    }
    const prodData = {
      id,
      cookie,
      categoryID: changeProdForm.current.category.value,
      categoryName: changeProdForm.current.category.selectedOptions[0].label,
      img: changeProdForm.current.img.value,
      name: changeProdForm.current.nameProd.value,
      code: changeProdForm.current.codeProd.value,
      price: changeProdForm.current.price.value,
      availability: changeProdForm.current.availability.value,
      description: changeProdForm.current.description.value,
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
      {singleGoods.map((item) => {
        const cleanHTML = DOMPurify.sanitize(item.Description_UA);
        if (!prodToInput) {
          return (
            <div key={item.id}>
              <div className="goods-item">
                <div className="img-name-block">
                  <img src={item.Img_prod} alt="Img_prod" />
                  <p>{item.Name_prod_ua}</p>
                  <p>
                    Ціна: <b>{item.Price_prod}</b> грн.
                  </p>
                  <p style={{ fontSize: 12, opacity: 0.5 }}>Код товару: {item.Product_code}</p>
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
              <Reviews prodName={item.Name_prod_ua} id={item.id} />
            </div>
          );
        } else {
          return (
            <div className="redact-prod" key={item.id}>
              <form ref={changeProdForm}>
                <label htmlFor="category">Змінити категорію:</label>
                <select defaultValue="" name="category" className="selectRedactCategory">
                  <option value="" label="Оберіть категорію" disabled></option>
                  {categorysName.map((item) => {
                    return (
                      <option
                        value={item.ID_category}
                        key={item.ID_category}
                        label={item.Category_UA}></option>
                    );
                  })}
                </select>
                <label htmlFor="currentCategory">
                  Актуальна категорія:
                  <input
                    defaultValue={item.Category + ' ID: ' + item.ID_category}
                    type="text"
                    name="currentCategory"
                    disabled
                  />
                </label>
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
                <label htmlFor="codeProd">
                  Код товару:
                  <input defaultValue={item.Product_code} type="text" name="codeProd" />
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
                    onClick={(e) => applyChanges(item.id, e)}>
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
