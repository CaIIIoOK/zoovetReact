import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods, setCurrentPage } from '../redux/actions/goods';

function Pagination() {
  const dispatch = useDispatch();

  function createPages(pages, pagesCount, currentPage) {
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
  const { currentPage } = useSelector(({ getGoods }) => {
    return {
      currentPage: getGoods.currentPage,
    };
  });
  const { goodsPerPage } = useSelector(({ getGoods }) => {
    return {
      goodsPerPage: getGoods.goodsPerPage,
    };
  });
  const totalCount = useSelector(({ getGoods }) => {
    return {
      getGoods: getGoods.totalCount,
    };
  });
  const pagesCount = Math.ceil(totalCount.getGoods / goodsPerPage);
  let pages = [];
  createPages(pages, pagesCount, currentPage);

  React.useEffect(() => {
    dispatch(fetchGoods(currentPage, goodsPerPage));
  }, [currentPage]);

  return (
    <div className="pagination">
      {pages.map((page, index) => (
        <span
          key={index}
          className={currentPage === page ? 'active-btn' : 'pagination-item'}
          onClick={() => dispatch(setCurrentPage(page))}>
          {page}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
