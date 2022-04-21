const initialState = {
  login: '',
  name: '',
  id: 0,
  city: '',
  email: '',
  phone: '',
  hash: '',
};

const userDataReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_HASH':
      return {
        ...state,
        hash: action.hash,
        login: '',
        name: '',
        id: 0,
        city: '',
        email: '',
        phone: '',
      };
    case 'SET_USER_DATA':
      return {
        ...state,
        name: action.name,
        id: action.id,
        city: action.city,
        email: action.email,
        login: action.login,
        phone: action.phone,
      };

    default:
      return state;
  }
};

export default userDataReduser;
