import axios from 'axios';

const godsDisplay = (goods, totalCount) => ({
  type: 'DISPLAY_GOODS',
  goods,
  totalCount,
});
const setCurrentPage = (currentPage) => ({
  type: 'SET_GOODS',
  currentPage,
});

const fetchGoods = (currentPage, perPage) => (dispatch) => {
  axios({
    method: 'GET',
    url: `http://localhost:3001/goods?&perpage=${perPage}&current=${currentPage}`,
  }).then(({ data }) => {
    return dispatch(godsDisplay(data.goods, data.count[0].count));
  });
};

export { fetchGoods, setCurrentPage };
