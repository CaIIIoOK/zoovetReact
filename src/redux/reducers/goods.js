const initialState = {
  goods: [],
  reviews: [],
  singleGoods: [],
  currentPage: 1,
  goodsPerPage: 30,
  totalCount: 0,
  categoryId: 0,
  soloItemId: 0,
  isLoaded: false,
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
        isLoaded: true,
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
    case 'SET_CATEGORY_ID': {
      return {
        ...state,
        categoryId: action.id,
        isLoaded: false,
      };
    }
    case 'SET_SOLO_ITEM_ID': {
      return {
        ...state,
        singleGoods: action.goods,
        isLoaded: true,
      };
    }
    case 'SET_REVIEWS': {
      return {
        ...state,
        reviews: action.review,
      };
    }

    default:
      return state;
  }
};

export default getGoods;
