const initialState = {
  cartStatus: false,
};

const cartStatus = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CART':
      return {
        ...state,
        cartStatus: action.open,
      };
    case 'CLOSE_CART':
      return {
        ...state,
        cartStatus: action.close,
      };

    default:
      return state;
  }
};

export default cartStatus;
