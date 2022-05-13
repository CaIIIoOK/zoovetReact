import React from 'react';
import fetchAdminOrders from '../back-end-request/fetchAdminOrders';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(({ userDataReduser }) => userDataReduser);

  React.useEffect(() => {
    dispatch(fetchAdminOrders());
  }, []);

  const setTableShow = (e) => {
    e.target.previousSibling.style.display = 'inline';
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'inline';
  };

  const setTableHide = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'inline';
    e.target.nextSibling.nextSibling.style.display = 'none';
  };
  const showSoloItem = (id) => {
    dispatch(fetchGoodsSoloItem(id));
  };

  return (
    <div className="my-order">
      <h3>Замовлення</h3>
      {orders.length !== 0
        ? orders.map((elem) => {
            return (
              <ul key={elem.id}>
                <li>
                  {' '}
                  <img src={elem.goods_img} alt="" />
                  <NavLink
                    to={'/goods-solo?&id=' + elem.goods_id}
                    onClick={() => showSoloItem(elem.id)}>
                    <span>{elem.goods_name} </span>
                  </NavLink>
                  <img
                    src="./img/icons-arrow-orders-left.png"
                    alt=""
                    style={{ width: '20px', display: 'none', marginLeft: '5px', cursor: 'pointer' }}
                    onClick={(e) => setTableHide(e)}
                  />
                  <img
                    src="./img/icons-arrow-orders.png"
                    alt=""
                    style={{ width: '20px', marginLeft: '5px', cursor: 'pointer' }}
                    onClick={(e) => setTableShow(e)}
                  />
                  <table className="table-my-orders">
                    <tbody>
                      <tr>
                        <th>Кількість</th>
                        <th>Ціна</th>
                        <th>Загальна сума</th>
                        <th>Доставка</th>
                        <th>{elem.user_deliverycityArea ? 'Населений пункт' : ''}</th>
                        <th>{elem.user_warehouse === 'Оберіть відділення' ? '' : 'Відділення'}</th>
                        <th>Дата</th>
                      </tr>
                      <tr>
                        <td>{elem.goods_amount}</td>
                        <td>{elem.goods_cost}</td>
                        <td>{elem.total}</td>
                        <td>{elem.user_delivery}</td>
                        <td>{elem.user_deliverycityArea}</td>
                        <td>
                          {elem.user_warehouse === 'Оберіть відділення' ? '' : elem.user_warehouse}
                        </td>
                        <td>{elem.date.slice(0, 16)}</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            );
          })
        : ''}
    </div>
  );
}
