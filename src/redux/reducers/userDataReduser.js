const initialState = {
  login: '',
  name: '',
  id: 0,
  secondname: '',
  email: '',
  phone: '',
  orders: [],
  passModalStatus: false,
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
        phone: action.phone,
        orders: action.orders,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        login: action.login,
      };
    case 'SHOW_PASS_MODAL':
      return {
        ...state,
        passModalStatus: action.passModalStatus,
      };
    case 'CLEAR_USER_DATA':
      return (state = action.state);

    default:
      return state;
  }
};

export default userDataReduser;
