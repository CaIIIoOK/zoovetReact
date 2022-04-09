const initialState = {
  categorysName: [],
  isLoaded: false,
};

const categorys = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_CATEGORY':
      return {
        ...state,
        categorysName: action.name,
        isLoaded: true,
      };

    default:
      return state;
  }
};

export default categorys;
