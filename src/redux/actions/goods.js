import axios from 'axios';

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

const fetchGoods = (currentPage, perPage, category) => (dispatch) => {
  let catgoryId = `&categoty=${category}`;
  if (!category) {
    catgoryId = '';
  }
  axios({
    method: 'GET',
    url: `http://localhost:3001/goods?&perpage=${perPage}&current=${currentPage}${catgoryId}`,
  }).then(({ data }) => {
    let productsWithCartStatus = data.goods.map((item) => {
      item.isInCart = false;
      return item;
    });
    return dispatch(goodsDisplay(productsWithCartStatus, data.count[0].count));
  });
};

export {
  fetchGoods,
  setCurrentPage,
  setStatusGoodsCart,
  addToCartStatus,
  deleteFromCartStatus,
  setCategoryId,
};
