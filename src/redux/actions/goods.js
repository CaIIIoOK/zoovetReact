const goodsDisplay = (goods, totalCount) => ({
  type: 'DISPLAY_GOODS',
  goods,
  totalCount,
});

const setCurrentPage = (currentPage) => ({
  type: 'SET_GOODS',
  currentPage,
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

const setSoloItemData = (goods) => ({
  type: 'SET_SOLO_ITEM_ID',
  goods,
});
const setReviews = (review) => ({
  type: 'SET_REVIEWS',
  review,
});
const setRandomGoods = (randomGoods) => ({
  type: 'SET_RANDOM_GOODS',
  randomGoods,
});
export {
  goodsDisplay,
  setCurrentPage,
  addToCartStatus,
  deleteFromCartStatus,
  setCategoryId,
  setSoloItemData,
  setReviews,
  setRandomGoods,
};
