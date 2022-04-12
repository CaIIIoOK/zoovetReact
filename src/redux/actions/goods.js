const goodsDisplay = (goods, totalCount) => ({
  type: 'DISPLAY_GOODS',
  goods,
  totalCount,
});

const setCurrentPage = (currentPage) => ({
  type: 'SET_GOODS',
  currentPage,
});

const setStatusGoodsCart = (toCartStatus) => ({
  type: 'TO_CART_STATUS',
  toCartStatus,
});

const addToCartStatus = (id, isInCart) => ({
  type: 'ADD_TO_CART',
  id,
  isInCart,
});

const deleteFromCartStatus = (id) => ({
  type: 'DELETE_FROM_CART',
  id,
});

const setCategoryId = (id) => ({
  type: 'SET_CATEGORY_ID',
  id,
});

export {
  goodsDisplay,
  setCurrentPage,
  setStatusGoodsCart,
  addToCartStatus,
  deleteFromCartStatus,
  setCategoryId,
};
