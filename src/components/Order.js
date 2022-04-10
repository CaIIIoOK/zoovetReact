import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionMinusCart, actionPlusCart, actionToTrash, clearCart } from '../redux/actions/cart';
import { deleteFromCartStatus } from '../redux/actions/goods';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Order = () => {
  const { cartGoods, totalPrice } = useSelector(({ cartReduce }) => cartReduce);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const objSendOrder = {
      data,
      cartGoods,
      totalPrice,
    };
    console.log(objSendOrder);
    dispatch(clearCart());
    reset();
    Swal.fire({
      title: 'Дякуємо за замовлення',
      text: "Ми з вами зв'яжемося",
      icon: 'success',
      confirmButtonText: 'Ок',
    });
  };

  return (
    <div className="order-page">
      <div className="order_form">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form_control">
            <label htmlFor="username">Ім'я</label>
            <hr />
            <input
              type="text"
              id="username"
              placeholder="Введіть свє Ім'я"
              {...register('username', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 2,
                  message: 'Мінімум 2 символів',
                },
                maxLength: {
                  value: 30,
                  message: 'Забагато символів',
                },
              })}
            />
            <div className="error-input">
              {errors?.username && <p>{errors?.username?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="usersecondname">Прізвище</label>
            <hr />
            <input
              type="text"
              id="usersecondname"
              placeholder="Введіть своє прізвище"
              {...register('usersecondname', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 2,
                  message: 'Мінімум 2 символів',
                },
                maxLength: {
                  value: 30,
                  message: 'Забагато символів',
                },
              })}
            />
            <div className="error-input">
              {errors?.usersecondname && <p>{errors?.usersecondname?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="phone">Телефон</label>
            <hr />
            <input
              type="number"
              id="phone"
              placeholder="+380505555555"
              {...register('phone', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 5,
                  message: 'Мінімум 5 символів',
                },
                maxLength: {
                  value: 30,
                  message: 'Забагато символів',
                },
              })}
            />
            <div className="error-input">
              {errors?.phone && <p>{errors?.phone?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <hr />
            <input
              type="text"
              id="email"
              placeholder="email@example.com"
              {...register('email', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 5,
                  message: 'Мінімум 5 символів',
                },
                maxLength: {
                  value: 40,
                  message: 'Забагато символів',
                },
                pattern: {
                  value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                  message: 'Введіть коректний Email',
                },
              })}
            />
            <div className="error-input">
              {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="city">Місто (населений пункт)</label>
            <hr />
            <input
              type="text"
              id="city"
              placeholder="Місто"
              {...register('city', {
                required: 'Це поле потрібно заповнити',
                minLength: {
                  value: 5,
                  message: 'Мінімум 5 символів',
                },
                maxLength: {
                  value: 30,
                  message: 'Забагато символів',
                },
              })}
            />
            <div className="error-input">
              {errors?.city && <p>{errors?.city?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="street">Вулиця </label>
            <hr />
            <input
              type="text"
              id="street"
              placeholder="Вулиця"
              {...register('street', {
                required: false,
              })}
            />
          </div>
          <div className="form_control">
            <label htmlFor="house">№ Будинку </label>
            <hr />
            <input
              type="text"
              id="house"
              placeholder="Будинок"
              {...register('house', {
                required: false,
              })}
            />
          </div>
          <select name="delivery" className="delivery-select" {...register('delivery')}>
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
            <input
              type="checkbox"
              {...register('check', {
                required: 'Ви не прийняли умови',
              })}
            />
            <div className="error-input">
              {errors?.check && <p>{errors?.check?.message || 'Error'}</p>}
            </div>
            <span>
              Я приймаю{' '}
              <Link exact="true" to="/delivery_info" className="nav-link">
                умови
              </Link>{' '}
              покупки
            </span>
          </div>
          <button className="btn-order-send" disabled={!isValid}>
            Відправити замовлення
          </button>
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
