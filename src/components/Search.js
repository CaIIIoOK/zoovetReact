import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import fetchSearch from '../back-end-request/fetchSearch';
import { setSearchVal } from '../redux/actions/searchAction';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';
import fetchUserData from '../back-end-request/fetchUserData';
import fetchChangeProdDataAll from '../back-end-request/fetchChangeProdDataAll';

import DOMPurify from 'dompurify';

const Search = () => {
  const dispatch = useDispatch();
  const { searchResult, value } = useSelector(({ searchReduser }) => searchReduser);
  const [searchParams] = useSearchParams();
  const { permission } = useSelector(({ userDataReduser }) => userDataReduser);
  const searchQuery = searchParams.get('search-name');
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    dispatch(fetchSearch(searchQuery));
    dispatch(setSearchVal(searchQuery));
    if (cookie !== '') {
      dispatch(fetchUserData(cookie));
    }
  }, [searchQuery]);

  const changeProdData = (e) => {
    e.preventDefault();
    let [id, availability, nameProd, price, code] = e.target.form;
    const prodData = {
      id: id.value,
      cookie,
      name: nameProd.value,
      price: price.value,
      availability: availability.value,
      code: code.value,
    };
    let conf = window.confirm('Ви впевнені?');
    if (conf) {
      dispatch(fetchChangeProdDataAll(prodData));
    } else {
      return;
    }
  };
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
                  {permission !== 'admin' ? (
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
                  ) : (
                    <form className="admin_good">
                      <label htmlFor="id">
                        Id:
                        <input type="text" name="id" id="idInput" defaultValue={elem.id} readOnly />
                      </label>
                      <label htmlFor="availability">
                        Id:
                        <input
                          type="text"
                          name="availability"
                          id="idInput"
                          defaultValue={elem.availability}
                        />
                      </label>
                      <label htmlFor="nameProd">
                        Назва товару:
                        <input
                          type="text"
                          name="nameProd"
                          id="nameAdminProd"
                          defaultValue={elem.Name_prod_ua}
                        />
                      </label>
                      <label htmlFor="price">
                        Ціна:
                        <input
                          type="text"
                          name="price"
                          defaultValue={elem.Price_prod}
                          id="priceAdminProd"
                        />
                      </label>
                      <label htmlFor="code">
                        Код товару:
                        <input
                          type="text"
                          name="code"
                          defaultValue={elem.Product_code}
                          id="priceAdminProd"
                        />
                      </label>
                      <NavLink
                        to={'/goods-solo?&id=' + elem.id}
                        onClick={() => fetchGoodsSoloItem(elem.id)}
                        style={{ width: 60 }}>
                        {'>>>'}
                      </NavLink>
                      <button className="print_button" onClick={(e) => changeProdData(e)}>
                        Змінити
                      </button>
                    </form>
                  )}
                </ul>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Search;
