import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions/goods';
import fetchGoods from '../back-end-request/fetchGoods';

function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, goodsPerPage, totalCount, categoryId } = useSelector(
    ({ getGoods }) => getGoods,
  );
  React.useEffect(() => {
    dispatch(fetchGoods(currentPage, goodsPerPage, categoryId));
  }, [currentPage, categoryId, goodsPerPage, dispatch]);

  const pagesCount = Math.ceil(totalCount / goodsPerPage);
  let pages = [];
  function createPages(pages, pagesCount, currentPage) {
    if (pagesCount > 6) {
      if (currentPage > 3) {
        for (let i = currentPage - 2; i <= currentPage + 3; i++) {
          pages.push(i);
          if (i === pagesCount) break;
        }
      } else {
        for (let i = 1; i <= 6; i++) {
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
  createPages(pages, pagesCount, currentPage);

  function arrowMinus() {
    if (currentPage !== 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
    return;
  }
  function arrowPlus() {
    if (currentPage === pagesCount) {
      return;
    }
    dispatch(setCurrentPage(currentPage + 1));
  }
  return (
    <div className="pagination">
      <button className="pagination-arrow" onClick={arrowMinus}>
        ❮❮
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          className={currentPage === page ? 'active-btn' : 'pagination-item'}
          onClick={() => dispatch(setCurrentPage(page))}>
          {page}
        </button>
      ))}
      <button className="pagination-arrow" onClick={arrowPlus}>
        ❯❯
      </button>
    </div>
  );
}

export default Pagination;
