const setUserDataAction = (login, name, id, secondname, email, phone) => ({
  type: 'SET_USER_DATA',
  login,
  name,
  id,
  secondname,
  email,
  phone,
});

const clearUserDataAction = (state) => ({
  type: 'CLEAR_USER_DATA',
  state,
});

const setLoginForHead = (login) => ({
  type: 'SET_LOGIN',
  login,
});

export { setUserDataAction, clearUserDataAction, setLoginForHead };
