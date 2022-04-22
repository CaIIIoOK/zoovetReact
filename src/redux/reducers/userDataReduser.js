const initialState = {
  login: '',
  name: '',
  id: 0,
  city: '',
  email: '',
  phone: '',
};

const userDataReduser = (state = initialState, action) => {
  switch (action.type) {
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
    case 'CLEAR_USER_DATA':
      return (state = action.state);

    default:
      return state;
  }
};

export default userDataReduser;
