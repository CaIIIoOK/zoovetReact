const initialState = {
  login: '',
  pass: '',
  name: '',
  id: 0,
  secondname: '',
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
        secondname: action.secondname,
        email: action.email,
        login: action.login,
        pass: action.pass,
        phone: action.phone,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        login: action.login,
      };
    case 'CLEAR_USER_DATA':
      return (state = action.state);

    default:
      return state;
  }
};

export default userDataReduser;
