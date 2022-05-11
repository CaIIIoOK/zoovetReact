const initialState = {
  searchResult: [],
  value: '',
};

const searchReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SEARCH_GOODS':
      return {
        ...state,
        searchResult: action.arr,
      };
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
};

export default searchReduser;
