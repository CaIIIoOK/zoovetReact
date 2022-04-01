const initialState = {
  categorysName: [],
};

const categorys = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_CATEGORY':
      return {
        ...state,
        categorysName: action.name,
      };

    default:
      return state;
  }
};

export default categorys;
