const initialState = {
  goods: [],
  currentPage: 1,
  goodsPerPage: 30,
  totalCount: 0,
};

function findProdById(arr, id) {
  return arr.find((elem) => elem.id === id);
}

const getGoods = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_GOODS':
      return {
        ...state,
        goods: action.goods,
        totalCount: action.totalCount,
      };
    case 'SET_GOODS':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'ADD_TO_CART': {
      const addProd = findProdById(state.goods, action.id);
      addProd.isInCart = true;
      return {
        ...state,
        goods: state.goods,
      };
    }
    case 'DELETE_FROM_CART': {
      const addProd = findProdById(state.goods, action.id);
      addProd.isInCart = false;
      return {
        ...state,
        goods: state.goods,
      };
    }
    default:
      return state;
  }
};

export default getGoods;
