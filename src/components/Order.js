import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionMinusCart, actionPlusCart, actionToTrash } from '../redux/actions/cart';
import { deleteFromCartStatus } from '../redux/actions/goods';

const Order = () => {
  return (
    <div className="order-page">
      <div className="order_form">
        <form action="">
          <div className="form_control">
            <label htmlFor="username">Ім'я</label>
            <hr />
            <input type="text" id="username" placeholder="Введіть свє Ім'я" />
          </div>
          <div className="form_control">
            <label htmlFor="usersecondname">Прізвище, По батькові</label>
            <hr />
            <input
              type="text"
              id="usersecondname"
              placeholder="Введіть своє прізвище та по батькові"
            />
          </div>
          <div className="form_control">
            <label htmlFor="phone">Телефон</label>
            <hr />
            <input type="text" id="phone" placeholder="+380505555555" />
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <hr />
            <input type="text" id="email" placeholder="email@example.com" />
          </div>
          <div className="form_control">
            <label htmlFor="city">
              Місто <span>(населений пункт)</span>{' '}
            </label>
            <input type="text" id="city" placeholder="Місто" />
          </div>
          <div className="form_control">
            <label htmlFor="street">Вулиця </label>
            <hr />
            <input type="text" id="street" placeholder="Вулиця" />
          </div>
          <div className="form_control">
            <label htmlFor="house">№ Будинку </label>
            <hr />
            <input type="text" id="house" placeholder="Будинок" />
          </div>
          <select name="delivery" className="delivery-select">
            <option hidden>Обрати доставку</option>
            <option value="novap" id="novap">
              Доставка "Нова Почта"
            </option>
            <option value="justin" id="justin">
              Доставка "Justin"
            </option>
            <option value="ukrp" id="ukrp">
              Доставка "Укрпочта"
            </option>
          </select>
          <div className="form_control">
            <input type="checkbox" value="1" />
            <span>
              Я приймаю{' '}
              <Link exact="true" to="/delivery_info" className="nav-link">
                умови
              </Link>{' '}
              покупки
            </span>
          </div>
          <button className="btn-order-send">Відправити замовлення</button>
        </form>
      </div>
      <OrderCart />
    </div>
  );
};

function OrderCart() {
  const { cartGoods, totalPrice } = useSelector(({ cartReduce }) => cartReduce);
  const dispatch = useDispatch();

  function itemToTrash(id) {
    dispatch(actionToTrash(id));
    dispatch(deleteFromCartStatus(id));
  }
  function cartMinus(id) {
    dispatch(actionMinusCart(id));
  }

  function cartPlus(id) {
    dispatch(actionPlusCart(id));
  }

  return (
    <div className="order-cart">
      <h3>{cartGoods.length === 0 ? 'Корзина пуста' : 'Корзина замовлень:'}</h3>
      {!(cartGoods.length === 0) &&
        cartGoods.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt="" />
            <h4>{item.name}</h4>
            <i className="fas fa-trash-alt trash" onClick={() => itemToTrash(item.id)}></i>
            <hr />
            <p>
              Кількість:{' '}
              <button
                className="far fa-minus-square cart-minus"
                onClick={() => cartMinus(item.id)}></button>
              {item.quantity}{' '}
              <button
                className="far fa-plus-square cart-plus"
                onClick={() => cartPlus(item.id)}></button>
            </p>
            <hr />
            <p>Ціна шт. : {item.price} грн</p>
          </div>
        ))}
      {totalPrice === 0 ? null : (
        <div className="totalCount">
          <p>Загальна сума:</p>
          <span>{totalPrice} грн</span>
        </div>
      )}
    </div>
  );
}
export default Order;
