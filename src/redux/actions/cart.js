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

export { cartOpen, cartClose, actionAddToCart };
