import axios from 'axios';

const godsDisplay = (goods) => ({
  type: 'DISPLAY_GOODS',
  goods,
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
    return dispatch(godsDisplay(data));
  });
};
export function createPages(pages, pagesCount, currentPage) {
  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}
export { fetchGoods, setCurrentPage };
