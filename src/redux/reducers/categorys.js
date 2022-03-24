const initialState = {
  categorysName: [],
};

const categorys = (state = initialState, action) => {
  if (action.type === 'SHOW_CAT') {
    return {
      ...state,
      categorysName: action.name,
    };
  }
  return state;
};

export default categorys;
