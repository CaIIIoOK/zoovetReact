import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { cartClose } from '../redux/actions/cart';

function Cart() {
  const cartRef = React.useRef();
  const shadowRef = React.useRef();
  const dispatch = useDispatch();
  const { cartStatus, cartGoods, totalPrice } = useSelector(({ cartReduce }) => cartReduce);

  function toggleCart() {
    dispatch(cartClose(false));
  }

  const goods = Object.keys(cartGoods).map((key) => {
    return cartGoods[key].cartGoods[0];
  });

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
          <i className="fas fa-times" onClick={toggleCart}></i>
          <h3>{goods.length === 0 ? 'Корзина пуста' : 'Корзина замовлень:'}</h3>
          {!(goods.length === 0) &&
            goods.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt="" />
                <h4>{item.name}</h4>
                <i className="fas fa-trash-alt trash"></i>
                <hr />
                <p>Кількість: {cartGoods[item.id].cartGoods.length}</p>
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
      </CSSTransition>
      <CSSTransition
        nodeRef={shadowRef}
        in={cartStatus}
        timeout={200}
        classNames="cart-node"
        mountOnEnter
        unmountOnExit>
        <div ref={shadowRef} className="shadow" onClick={toggleCart}></div>
      </CSSTransition>
    </>
  );
}

export default Cart;
