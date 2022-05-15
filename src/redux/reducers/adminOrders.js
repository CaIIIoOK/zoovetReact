const initialState = {
  orders: [],
};

const userDataReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ADMIN_ORDERS':
      return {
        ...state,
        orders: action.orders,
      };
    default:
      return state;
  }
};

export default userDataReduser;
