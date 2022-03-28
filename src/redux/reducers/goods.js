const initialState = {
  goods: [],
  currentPage: 1,
  goodsPerPage: 30,
  totalCount: 0,
};

const getGoods = (state = initialState, action) => {
  if (action.type === 'DISPLAY_GOODS') {
    return {
      ...state,
      goods: action.goods,
      totalCount: action.totalCount,
    };
  }
  if (action.type === 'SET_GOODS') {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }
  return state;
};

export default getGoods;
