const getAdminOrdersAction = (orders) => ({
  type: 'GET_ADMIN_ORDERS',
  orders,
});

const setOrderForPrint = (printOrder, printTotal) => ({
  type: 'SET_PRINT_ORDER',
  printOrder,
  printTotal,
});

export { getAdminOrdersAction, setOrderForPrint };
