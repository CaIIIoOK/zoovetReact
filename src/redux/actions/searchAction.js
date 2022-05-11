const searchGoodsByVal = (arr) => ({
  type: 'GET_SEARCH_GOODS',
  arr,
});

const setSearchVal = (value) => ({
  type: 'SET_SEARCH_VALUE',
  value,
});
export { searchGoodsByVal, setSearchVal };
