const initialState = {
  goods: [],
  currentPage: 1,
  goodsPerPage: 30,
  totalCount: 0,
};

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
    default:
      return state;
  }
};

export default getGoods;
