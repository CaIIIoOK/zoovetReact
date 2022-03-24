import React from 'react';
import { CSSTransition } from 'react-transition-group';

function Cart({ ...props }) {
  const nodeRef = React.useRef();

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.status}
      timeout={200}
      classNames="cart-node"
      mountOnEnter
      unmountOnExit>
      <div ref={nodeRef} className="shadow" onClick={props.onClose}>
        <div className="cart">
          <i className="fas fa-times" onClick={props.onClose}></i>
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
      </div>
    </CSSTransition>
  );
}

export default Cart;
