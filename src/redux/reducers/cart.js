const initialState = {
  cartStatus: false,
};

const cartOpened = (state = initialState, action) => {
  if (action.type === 'OPEN_CART') {
    return {
      ...state,
      cartStatus: action.open,
    };
  }
  if (action.type === 'CLOSE_CART') {
    return {
      ...state,
      cartStatus: action.close,
    };
  }
  return state;
};

export default cartOpened;
