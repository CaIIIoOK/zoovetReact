const initialState = {
  orders: [],
  totalPrice: [],
  printOrder: {},
  printTotal: '',
};

const adminOrders = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ADMIN_ORDERS':
      return {
        ...state,
        orders: action.orders,
        totalPrice: action.orders.map((elem) =>
          elem.user_order.reduce((sum, item) => item.price * item.quantity + sum, 0),
        ),
      };
    case 'SET_PRINT_ORDER':
      return {
        ...state,
        printOrder: action.printOrder,
        printTotal: action.printTotal,
      };

    default:
      return state;
  }
};

export default adminOrders;
