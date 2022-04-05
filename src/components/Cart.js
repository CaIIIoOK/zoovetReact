import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { actionMinusCart, actionPlusCart, actionToTrash } from '../redux/actions/cart';
import { cartClose } from '../redux/actions/cartStatus';
import { deleteFromCartStatus } from '../redux/actions/goods';

function Cart() {
  const cartRef = React.useRef();
  const shadowRef = React.useRef();
  const dispatch = useDispatch();
  const { cartGoods, totalPrice } = useSelector(({ cartReduce }) => cartReduce);
  const { cartStatus } = useSelector(({ cartStatus }) => cartStatus);

  function toggleCart() {
    dispatch(cartClose(false));
  }

  function cartMinus(id) {
    dispatch(actionMinusCart(id));
  }

  function cartPlus(id) {
    dispatch(actionPlusCart(id));
  }

  function itemToTrash(id) {
    dispatch(actionToTrash(id));
    dispatch(deleteFromCartStatus(id));
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
          <i className="fas fa-times" onClick={toggleCart}></i>
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
