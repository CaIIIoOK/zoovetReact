import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { cartClose } from '../redux/actions/cart';

function Cart() {
  const cartRef = React.useRef();
  const shadowRef = React.useRef();
  const { state } = useSelector(({ cartOpened }) => {
    return {
      state: cartOpened.cartStatus,
    };
  });
  const dispatch = useDispatch();
  function toggle() {
    dispatch(cartClose(false));
  }

  return (
    <>
      <CSSTransition
        nodeRef={cartRef}
        in={state}
        timeout={200}
        classNames="cart-node"
        mountOnEnter
        unmountOnExit>
        <div ref={cartRef} className="cart">
          <i className="fas fa-times" onClick={toggle}></i>
          <h3>Корзина замовлень</h3>
          <div className="cart-items">
            <img src="./img/logo.png" alt="" />
            <h4>Назва товару</h4>
            <i className="fas fa-trash-alt trash"></i>
            <hr />
            <p>Кількість:</p>
            <hr />
            <p>Ціна:</p>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={shadowRef}
        in={state}
        timeout={200}
        classNames="cart-node"
        mountOnEnter
        unmountOnExit>
        <div ref={shadowRef} className="shadow" onClick={toggle}></div>
      </CSSTransition>
    </>
  );
}

export default Cart;
