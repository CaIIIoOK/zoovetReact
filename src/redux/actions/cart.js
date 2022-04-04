const cartOpen = (open) => ({
  type: 'OPEN_CART',
  open,
});

const cartClose = (close) => ({
  type: 'CLOSE_CART',
  close,
});

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

export { cartOpen, cartClose, actionAddToCart, actionMinusCart, actionPlusCart };
