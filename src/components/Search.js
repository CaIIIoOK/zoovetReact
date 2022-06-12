import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import DOMPurify from 'dompurify';

const Search = () => {
  const { searchResult, value } = useSelector(({ searchReduser }) => searchReduser);

  return (
    <div className="main-page">
      <div className="searchResultContainer">
        <p style={{ margin: '10px' }}>
          Результат пошуку:{' '}
          {searchResult.length === 0 ? `"${value}" не дав результатів` : `"${value}"`}
        </p>
        {searchResult.length !== 0
          ? searchResult.map((elem) => {
              const cleanHTML = DOMPurify.sanitize(elem.Description_UA);
              return (
                <ul key={elem.id}>
                  <li>
                    <NavLink to={'/goods-solo?&id=' + elem.id}>
                      <img src={elem.Img_prod} alt="" />
                      <p>{elem.Name_prod_ua}</p>
                    </NavLink>
                    <span>
                      Ціна:<b>{elem.Price_prod}</b>
                    </span>
                    <i
                      dangerouslySetInnerHTML={{ __html: cleanHTML }}
                      style={{ marginRight: 10 }}></i>
                    <p style={{ fontSize: 12, opacity: 0.5 }}>Код товару: {elem.Product_code}</p>
                  </li>
                </ul>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Search;
