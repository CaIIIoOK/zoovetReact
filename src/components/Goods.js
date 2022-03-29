import React from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';

function Goods() {
  const getGoods = useSelector(({ getGoods }) => {
    return {
      getGoods: getGoods.goods,
    };
  });

  return (
    <div className="main-page">
      <ul>
        {getGoods.getGoods.map((names, index) => {
          return <li key={index}>{names.Name_prod_ua}</li>;
        })}
      </ul>

      <Pagination />
    </div>
  );
}

export default Goods;
