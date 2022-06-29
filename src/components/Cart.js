import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionMinusCart,
  actionPlusCart,
  actionToTrash,
  actionChangeQuantityByInput,
} from '../redux/actions/actionsCart';
import { cartClose } from '../redux/actions/cartStatus';
import { deleteFromCartStatus } from '../redux/actions/goods';
import { Link } from 'react-router-dom';

function Cart() {
  const cartRef = React.useRef();
  const shadowRef = React.useRef();
  const dispatch = useDispatch();
  const [showError, setShowError] = React.useState(false);
  const { cartGoods, totalPrice } = useSelector(({ cartReduce }) => cartReduce);
  const { cartStatus } = useSelector(({ cartStatus }) => cartStatus);

  function closeCart() {
    dispatch(cartClose(false));
    document.querySelector('body').style.paddingRight = '0px';
    document.querySelector('body').style.overflow = 'auto';
  }

  function cartMinus(e, id) {
    dispatch(actionMinusCart(id));
    if (e.nextElementSibling.value <= 1) {
      return;
    }
    e.nextElementSibling.value--;
  }

  function cartPlus(e, id) {
    dispatch(actionPlusCart(id));
    e.previousElementSibling.value++;
  }

  function itemToTrash(id) {
    dispatch(actionToTrash(id));
    dispatch(deleteFromCartStatus(id));
  }
  function changeQuantity(e, id) {
    if (e.target.value % 1 !== 0 || e.target.value === '0') {
      setShowError(true);
      return;
    }
    if (e.target.value !== '') {
      dispatch(actionChangeQuantityByInput(id, e.target.value));
      setShowError(false);
    } else {
      setShowError(true);
      return;
    }
  }

  return (
    <>
      <CSSTransition
        nodeRef={cartRef}
        in={cartStatus}
        timeout={200}
        classNames="cart-node"
        mountOnEnter
        unmountOnExit>
        <div ref={cartRef} className="cart">
          <i className="fas fa-times" onClick={closeCart}></i>
          <h3>{cartGoods.length === 0 ? 'Корзина пуста' : 'Корзина замовлень:'}</h3>
          {!(cartGoods.length === 0) &&
            cartGoods.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt="" />
                <span>{item.name}</span>
                <i className="fas fa-trash-alt trash" onClick={() => itemToTrash(item.id)}></i>
                <hr />
                <p style={{ position: 'relative' }}>
                  Кількість:{' '}
                  <button
                    className="far fa-minus-square cart-minus"
                    onClick={(e) => cartMinus(e.target, item.id)}></button>
                  <input
                    type="number"
                    defaultValue={item.quantity}
                    onInput={(e) => changeQuantity(e, item.id)}
                  />
                  {showError && (
                    <span
                      style={{
                        color: 'red',
                        fontSize: 12,
                        position: 'absolute',
                        right: -160,
                        fontWeight: 100,
                      }}>
                      Вкажіть коректну кількість.
                    </span>
                  )}
                  <button
                    className="far fa-plus-square cart-plus"
                    onClick={(e) => cartPlus(e.target, item.id)}></button>
                </p>
                <hr />
                <p>Ціна шт. : {item.price} грн</p>
              </div>
            ))}
          {totalPrice === 0 ? null : (
            <div className="totalCount">
              <p>Загальна сума:</p>
              <span>{totalPrice} грн</span>
              <Link exact="true" to="/order" className="nav-link">
                <button className="btn-to-order" onClick={closeCart}>
                  Оформити змовлення
                </button>
              </Link>
            </div>
          )}
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={shadowRef}
        in={cartStatus}
        timeout={200}
        classNames="cart-node"
        mountOnEnter
        unmountOnExit>
        <div ref={shadowRef} className="shadow" onClick={closeCart}></div>
      </CSSTransition>
    </>
  );
}

export default Cart;
