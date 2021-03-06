import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionMinusCart,
  actionPlusCart,
  actionToTrash,
  clearCart,
} from '../redux/actions/actionsCart';
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
    dispatch(setDeliveryWarehouse([]));
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
            <label htmlFor="username">????'??</label>
            <hr />
            <input
              type="text"
              id="username"
              placeholder="?????????????? ?????? ????'??"
              {...register('username', {
                required: '???? ???????? ???????????????? ??????????????????',
                minLength: {
                  value: 2,
                  message: '?????????????? 2 ????????????????',
                },
                maxLength: {
                  value: 30,
                  message: '???????????????? ????????????????',
                },
              })}
            />
            <div className="error-input">
              {errors?.username && <p>{errors?.username?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="usersecondname">????????????????</label>
            <hr />
            <input
              type="text"
              id="usersecondname"
              placeholder="?????????????? ???????? ????????????????"
              {...register('usersecondname', {
                required: '???? ???????? ???????????????? ??????????????????',
                minLength: {
                  value: 2,
                  message: '?????????????? 2 ????????????????',
                },
                maxLength: {
                  value: 30,
                  message: '???????????????? ????????????????',
                },
              })}
            />
            <div className="error-input">
              {errors?.usersecondname && <p>{errors?.usersecondname?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="phone">??????????????</label>
            <hr />
            <input
              type="text"
              id="phone"
              placeholder="+380505555555"
              {...register('phone', {
                required: '???? ???????? ???????????????? ??????????????????',
                minLength: {
                  value: 5,
                  message: '?????????????? 5 ????????????????',
                },
                maxLength: {
                  value: 30,
                  message: '???????????????? ????????????????',
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
                required: '???? ???????? ???????????????? ??????????????????',
                minLength: {
                  value: 5,
                  message: '?????????????? 5 ????????????????',
                },
                maxLength: {
                  value: 30,
                  message: '???????????????? ????????????????',
                },
                pattern: {
                  value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                  message: '?????????????? ?????????????????? Email',
                },
              })}
            />
            <div className="error-input">
              {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="city">?????????? (?????????????????? ??????????)</label>
            <hr />
            <input
              type="text"
              id="city"
              placeholder="??????????"
              {...register('city', {
                required: '???? ???????? ???????????????? ??????????????????',
                minLength: {
                  value: 3,
                  message: '?????????????? 3 ????????????????',
                },
                maxLength: {
                  value: 30,
                  message: '???????????????? ????????????????',
                },
              })}
            />
            <div className="error-input">
              {errors?.city && <p>{errors?.city?.message || 'Error'}</p>}
            </div>
          </div>

          <label htmlFor="delivery-select">?????????????? ????????????????</label>
          <select
            name="delivery"
            className="delivery-select"
            {...register('delivery', {
              onChange: (e) => showInputDelivery(e),
            })}>
            <option hidden>???????????? ????????????????</option>
            <option value="novap" id="novap">
              ???????????????? "???????? ??????????"
            </option>
            <option value="justin" id="justin">
              ???????????????? "Justin"
            </option>
            <option value="ukrp" id="ukrp">
              ???????????????? "????????????????"
            </option>
          </select>
          <div className="form_control cityDelivery" ref={inputRef}>
            <label htmlFor="delivery-city">???????????????? ??????????</label>
            <hr />
            <input
              type="search"
              autoComplete="address-level4"
              name="cityDelivery"
              id="cityDelivery"
              placeholder="???????????????? ??????????"
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
                      `${cityJustin[0].fields.descr}, ${cityJustin[0].fields.district.descr} ??-??, ${cityJustin[0].fields.objectOwner.descr} ??????.`,
                    );
                  }}>
                  {cityJustin[0].fields.descr}, {cityJustin[0].fields.district.descr} ??-??,{' '}
                  {cityJustin[0].fields.objectOwner.descr} ??????.
                </li>
              ) : (
                <li id="noneRef">???? ???????????? ???????????? ???????????? ???? ????????????????</li>
              )}
            </ul>
            <div ref={warehouseRef} id="warehouse">
              <select name="warehouse" {...register('warehouse')}>
                <option hidden>?????????????? ????????????????????</option>
                {warehouse && city.length !== 0 ? (
                  warehouse.map((elem) => {
                    return <option key={elem.Ref}>{elem.Description}</option>;
                  })
                ) : cityJustin.length !== 0 ? (
                  warehouse.map((elem) => {
                    return (
                      <option key={elem.fields.code}>
                        {elem.fields.descr}, {elem.fields.address}
                      </option>
                    );
                  })
                ) : (
                  <option>???? ???????????? ???????????? ???????????? ???? ????????????????</option>
                )}
              </select>
            </div>
          </div>
          <div className="form_control">
            <input
              type="checkbox"
              {...register('check', {
                required: '???? ???? ???????????????? ??????????',
              })}
            />
            <div className="error-input">
              {errors?.check && <p>{errors?.check?.message || 'Error'}</p>}
            </div>
            <span>
              ?? ??????????????{' '}
              <Link exact="true" to="/delivery_info" className="nav-link">
                ??????????
              </Link>{' '}
              ??????????????
            </span>
          </div>
          <button className="btn-order-send" disabled={!isValid}>
            ???????????????????? ????????????????????
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
      <h3>{cartGoods.length === 0 ? '?????????????? ??????????' : '?????????????? ??????????????????:'}</h3>
      {!(cartGoods.length === 0) &&
        cartGoods.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt="" />
            <span>{item.name}</span>
            <i className="fas fa-trash-alt trash" onClick={() => itemToTrash(item.id)}></i>
            <hr />
            <p>
              ??????????????????:{' '}
              <button
                className="far fa-minus-square cart-minus"
                onClick={() => cartMinus(item.id)}></button>
              {item.quantity}{' '}
              <button
                className="far fa-plus-square cart-plus"
                onClick={() => cartPlus(item.id)}></button>
            </p>
            <hr />
            <p>???????? ????. : {item.price} ??????</p>
          </div>
        ))}
      {totalPrice === 0 ? null : (
        <div className="totalCount">
          <p>???????????????? ????????:</p>
          <span>{totalPrice} ??????</span>
        </div>
      )}
    </div>
  );
}
export default Order;
