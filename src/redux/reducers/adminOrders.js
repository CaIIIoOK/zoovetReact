const initialState = {
  orders: [],
  totalPrice: [],
};

const adminOrders = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ADMIN_ORDERS':
      return {
        ...state,
        orders: action.orders,
        totalPrice: action.orders
          .map((elem) => elem.user_order.map((item) => item.price * item.quantity))
          .map((el) =>
            el.reduce(function (sum, current) {
              return sum + current;
            }, 0),
          ),
      };

    default:
      return state;
  }
};

export default adminOrders;
