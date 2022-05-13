const setUserDataAction = (login, permission, name, id, secondname, email, phone, orders) => ({
  type: 'SET_USER_DATA',
  login,
  permission,
  name,
  id,
  secondname,
  email,
  phone,
  orders,
});

const clearUserDataAction = (state) => ({
  type: 'CLEAR_USER_DATA',
  state,
});

const setPassModalStatus = (passModalStatus) => ({
  type: 'SHOW_PASS_MODAL',
  passModalStatus,
});

const setLoginForHead = (login) => ({
  type: 'SET_LOGIN',
  login,
});

const getAdminOrdersAction = (orders) => ({
  type: 'GET_ADMIN_ORDERS',
  orders,
});

export {
  setUserDataAction,
  clearUserDataAction,
  setLoginForHead,
  setPassModalStatus,
  getAdminOrdersAction,
};
