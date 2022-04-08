const actionAddToCart = (goods) => ({
  type: 'ADD_GOODS_CART',
  goods,
});

const actionMinusCart = (id) => ({
  type: 'MINUS_CART',
  id,
});

const actionPlusCart = (id) => ({
  type: 'PLUS_CART',
  id,
});

const actionToTrash = (id, isInCart) => ({
  type: 'TO_TRASH',
  id,
  isInCart,
});

const clearCart = () => ({
  type: 'CLEAR_CART',
});

export { actionAddToCart, actionMinusCart, actionPlusCart, actionToTrash, clearCart };
