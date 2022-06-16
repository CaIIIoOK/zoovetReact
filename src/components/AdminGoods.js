import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import fetchChangeProdDataAll from '../back-end-request/fetchChangeProdDataAll';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';
import Pagination from './Pagination';

const AdminGoods = () => {
  const dispatch = useDispatch();

  const { goods } = useSelector(({ getGoods }) => getGoods);
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  const applyChanges = (e, id) => {
    e.preventDefault();
    const prodData = {
      id,
      cookie,
      name: e.target.form[0].value,
      price: e.target.form[1].value,
      availability: e.target.form[2].value,
      code: e.target.form[3].value,
    };
    let conf = window.confirm('Ви впевнені?');
    if (conf) {
      dispatch(fetchChangeProdDataAll(prodData));
    } else {
      return;
    }
  };
  return (
    <>
      <div className="admin_goods">
        {goods.map((item) => {
          return (
            <div key={item.id} className="admin_good">
              <form>
                <label htmlFor="nameProd">
                  Назва товару:
                  <input
                    defaultValue={item.Name_prod_ua}
                    type="text"
                    name="nameProd"
                    id="nameAdminProd"
                  />
                </label>
                <label htmlFor="price">
                  Ціна:
                  <input
                    defaultValue={item.Price_prod}
                    type="text"
                    name="price"
                    id="priceAdminProd"
                  />
                </label>
                <label htmlFor="availability">
                  Наявність:
                  <input
                    defaultValue={item.availability}
                    type="text"
                    name="availability"
                    id="priceAdminProd"
                  />
                </label>
                <label htmlFor="availability">
                  Код:
                  <input
                    defaultValue={item.Product_code}
                    type="text"
                    name="code"
                    id="priceAdminProd"
                  />
                </label>
                <button
                  className="redact-btn btn-apply"
                  onClick={(e) => applyChanges(e, item.id)}
                  style={{ fontSize: 12 }}>
                  Прийняти зміни
                </button>
              </form>
              <img src={item.Img_prod} alt="" style={{ width: 30, height: 35, marginRight: 5 }} />
              <NavLink
                to={'/goods-solo?&id=' + item.id}
                onClick={() => fetchGoodsSoloItem(item.id)}>
                {'>>>'}
              </NavLink>
            </div>
          );
        })}
        <Pagination />
      </div>
    </>
  );
};

export default AdminGoods;
