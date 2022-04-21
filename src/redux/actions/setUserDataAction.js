const setUserHashAction = (hash) => ({
  type: 'SET_USER_HASH',
  hash,
});

const setUserDataAction = (login, name, id, city, email, phone) => ({
  type: 'SET_USER_DATA',
  login,
  name,
  id,
  city,
  email,
  phone,
});

export { setUserHashAction, setUserDataAction };
