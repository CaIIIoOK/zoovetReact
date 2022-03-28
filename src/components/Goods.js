import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods, setCurrentPage, createPages } from '../redux/actions/goods';
import Pagination from './Pagination';

function Goods() {
  const getGoods = useSelector(({ getGoods }) => {
    return {
      getGoods: getGoods.goods,
    };
  });
  const currentPage = useSelector(({ getGoods }) => {
    return {
      currentPage: getGoods.currentPage,
    };
  });
  const goodsPerPage = useSelector(({ getGoods }) => {
    return {
      goodsPerPage: getGoods.goodsPerPage,
    };
  });
  const totalCount = useSelector(({ getGoods }) => {
    return {
      getGoods: getGoods.totalCount,
    };
  });
  let pages = [];
  const pagesCount = Math.ceil(totalCount.getGoods / goodsPerPage.goodsPerPage);
  const dispatch = useDispatch();

  createPages(pages, pagesCount, currentPage.currentPage);
  React.useEffect(() => {
    dispatch(fetchGoods(currentPage.currentPage, goodsPerPage.goodsPerPage));
  }, [currentPage.currentPage]);

  return (
    <div className="main-page">
      <ul>
        {getGoods.getGoods.map((names, index) => {
          return <li key={index}>{names.Name_prod_ua}</li>;
        })}
      </ul>
      <div className="pagination">
        {pages.map((page, index) => (
          <span key={index} className="page-item" onClick={() => dispatch(setCurrentPage(page))}>
            {page}
          </span>
        ))}
      </div>
      {/* <Pagination /> */}
    </div>
  );
}

export default Goods;
