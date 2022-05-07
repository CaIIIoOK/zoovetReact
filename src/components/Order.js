import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionMinusCart, actionPlusCart, actionToTrash, clearCart } from '../redux/actions/cart';
import { deleteFromCartStatus } from '../redux/actions/goods';
import { useForm } from 'react-hook-form';
import fetchOrder from '../back-end-request/fetchOrder';
import fetchCityDelivery from '../back-end-request/fetchCityDelivery';
import fetchWarehouse from '../back-end-request/fetchWarehouse';
import { setCityDelivery, setDeliveryWarehouse } from '../redux/actions/setCityDelivery';
import fetchUserData from '../back-end-request/fetchUserData';

const Order = () => {
  const dispatch = useDispatch();
  const { cartGoods } = useSelector(({ cartReduce }) => cartReduce);
  const { city, cityJustin, warehouse } = useSelector(({ cityDelivery }) => cityDelivery);
  const inputRef = React.useRef();
  const warehouseRef = React.useRef();
  const cityInformationRef = React.useRef();
  const [deliveryName, setDeliveryName] = React.useState('');
  const userData = useSelector(({ userDataReduser }) => userDataReduser);
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );

  React.useEffect(() => {
    if (cookie === '' || cookie === undefined) {
      return;
    } else {
      dispatch(fetchUserData(cookie));
    }
    return;
  }, []);

  React.useEffect(() => {
    setValue('username', userData.name);
    setValue('usersecondname', userData.secondname);
    setValue('phone', userData.phone);
    setValue('email', userData.email);
  }, [userData]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    delete data.check;
    const objSendOrder = {
      data,
      cartGoods,
      login: userData.login,
    };
    fetchOrder(objSendOrder);
    dispatch(clearCart());
    reset();
  };

  const showInputDelivery = (event) => {
    setDeliveryName(event.target.value);
    if (event.target.value === 'ukrp') {
      inputRef.current.style.display = 'none';
      return;
    }
    setValue('cityDelivery', '');
    warehouseRef.current.style.display = 'none';
    cityInformationRef.current.style.display = 'none';
    return (inputRef.current.style.display = 'inline-block');
  };

  const getInputDeliveryCity = (event) => {
    if (event.target.value.length >= 3) {
      cityInformationRef.current.style.display = 'inline-block';
      dispatch(
        fetchCityDelivery({
          deliveryName,
          value: event.target.value,
        }),
      );
    } else {
      cityInformationRef.current.style.display = 'none';
      if (warehouseRef) {
        warehouseRef.current.style.display = 'none';
      }
      dispatch(setCityDelivery([]));
    }
  };
  const addCityToInput = (cityRef, present) => {
    cityInformationRef.current.style.display = 'none';
    dispatch(setDeliveryWarehouse([]));
    setValue('cityDelivery', present);
    dispatch(
      fetchWarehouse({
        deliveryName,
        cityRef,
      }),
    );
    warehouseRef.current.style.display = 'inline-block';
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
              type="text"
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
                  value: 30,
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
                  value: 3,
                  message: 'Мінімум 3 символів',
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

          <label htmlFor="delivery-select">Оберіть доставку</label>
          <select
            name="delivery"
            className="delivery-select"
            {...register('delivery', {
              onChange: (e) => showInputDelivery(e),
            })}>
            <option hidden>Обрати доставку</option>
            <option value="novap" id="novap">
              Доставка "Нова Пошта"
            </option>
            <option value="justin" id="justin">
              Доставка "Justin"
            </option>
            <option value="ukrp" id="ukrp">
              Доставка "Укрпочта"
            </option>
          </select>
          <div className="form_control cityDelivery" ref={inputRef}>
            <label htmlFor="delivery-city">Наслений пункт</label>
            <hr />
            <input
              type="search"
              autoComplete="address-level4"
              name="cityDelivery"
              id="cityDelivery"
              placeholder="Наслений пункт"
              {...register('cityDelivery', {
                onChange: (event) => {
                  return getInputDeliveryCity(event);
                },
              })}
            />
            <ul className="custom_select" ref={cityInformationRef}>
              {city.length !== 0 ? (
                city.map((elem) => {
                  return (
                    <li
                      key={elem.Ref}
                      onClick={() => {
                        return addCityToInput(elem.DeliveryCity, elem.Present);
                      }}>
                      {elem.Present}
                    </li>
                  );
                })
              ) : cityJustin.length !== 0 ? (
                <li
                  onClick={() => {
                    return addCityToInput(
                      cityJustin[0].fields.uuid,
                      `${cityJustin[0].fields.descr}, ${cityJustin[0].fields.district.descr} р-н, ${cityJustin[0].fields.objectOwner.descr} обл.`,
                    );
                  }}>
                  {cityJustin[0].fields.descr}, {cityJustin[0].fields.district.descr} р-н,{' '}
                  {cityJustin[0].fields.objectOwner.descr} обл.
                </li>
              ) : (
                <li id="noneRef">По даному запиту нічого не знайдено</li>
              )}
            </ul>
            <div ref={warehouseRef} id="warehouse">
              <select name="warehouse" {...register('warehouse')}>
                <option hidden>Оберіть відділення</option>
                {warehouse &&
                  warehouse.map((elem) => {
                    return <option key={elem.Ref}>{elem.Description}</option>;
                  })}
              </select>
            </div>
          </div>
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
