const cartOpen = (open) => ({
  type: 'OPEN_CART',
  open,
});

const cartClose = (close) => ({
  type: 'CLOSE_CART',
  close,
});

export { cartOpen, cartClose };
