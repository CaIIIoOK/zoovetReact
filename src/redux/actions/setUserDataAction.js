const setUserDataAction = (login, name, id, city, email, phone) => ({
  type: 'SET_USER_DATA',
  login,
  name,
  id,
  city,
  email,
  phone,
});

const clearUserDataAction = (state) => ({
  type: 'CLEAR_USER_DATA',
  state,
});

export { setUserDataAction, clearUserDataAction };
