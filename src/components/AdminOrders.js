import React from 'react';
import fetchGoodsSoloItem from '../back-end-request/fetchGoodsSoloItem';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchAdminOrders, fetchChangeAdminOrders } from '../back-end-request/fetchAdminOrders';
import NewGoodsModal from './NewGoodsModal';

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(({ adminOrders }) => adminOrders);
  const [showNewProdModal, setShowNewProdModal] = React.useState(false);

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
  const changeStatusDelivery = (e, id) => {
    let data = {
      value: e.target.value,
      id,
    };
    dispatch(fetchChangeAdminOrders(data));
    console.log(e.target.value);
    if (e.target.value === '1') {
      e.target.offsetParent.style.backgroundColor = 'plum';
    }
    if (e.target.value === '2') {
      e.target.offsetParent.style.backgroundColor = 'rgb(108, 233, 255)';
    }
    if (e.target.value === '3') {
      e.target.offsetParent.style.backgroundColor = 'rgb(91, 253, 153)';
    }
  };

  return (
    <div className="my-order">
      <h3>Замовлення</h3>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Link
          to="/admin-change-prod-all"
          style={{
            textAlign: 'center',
            marginBottom: 10,
            marginRight: 10,
            fontSize: 15,
            padding: 5,
            backgroundColor: 'rgb(64, 252, 233)',
            borderRadius: 10,
            width: 150,
          }}>
          Редагувати товари або категорї
        </Link>
        <button
          style={{
            textAlign: 'center',
            marginBottom: 10,
            fontSize: 15,
            padding: 5,
            backgroundColor: 'rgb(64, 252, 233)',
            borderRadius: 10,
            width: 150,
          }}
          onClick={() => setShowNewProdModal(true)}>
          Додати новий товар
        </button>
        {showNewProdModal && <NewGoodsModal modalShow={setShowNewProdModal} />}
      </div>

      {orders.length !== 0
        ? orders
            .map((elem) => {
              return (
                <ul key={elem.id}>
                  <li
                    className={
                      elem.status === 1
                        ? 'purpAdm'
                        : elem.status === 2
                        ? 'blueAdm'
                        : elem.status === 3
                        ? 'greanAdm'
                        : 'redAdmn'
                    }>
                    <div className="buttons-admin-order">
                      <button
                        value={1}
                        style={{ backgroundColor: 'plum' }}
                        onClick={(e) => changeStatusDelivery(e, elem.id)}>
                        Дзвінок
                      </button>
                      <button
                        value={2}
                        style={{ backgroundColor: 'rgb(108, 233, 255)' }}
                        onClick={(e) => changeStatusDelivery(e, elem.id)}>
                        Відправлено
                      </button>
                      <button
                        value={3}
                        style={{ backgroundColor: 'rgb(91, 253, 153)' }}
                        onClick={(e) => changeStatusDelivery(e, elem.id)}>
                        Отримано
                      </button>
                    </div>
                    <img src={elem.goods_img} alt="" />
                    <NavLink
                      to={'/goods-solo?&id=' + elem.goods_id}
                      onClick={() => showSoloItem(elem.id)}>
                      <span>{elem.goods_name} </span>
                    </NavLink>
                    <img
                      src="./img/icons-arrow-orders-left.png"
                      alt=""
                      style={{
                        width: '20px',
                        display: 'none',
                        marginLeft: '5px',
                        cursor: 'pointer',
                      }}
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
                          <th>Ціна за шт.</th>
                          <th>Загальна сума</th>
                          <th>Доставка</th>
                          <th>Імя, Прізвище, Телефон, Місто</th>
                          <th>{elem.user_deliverycityArea ? 'Населений пункт' : ''}</th>
                          <th>
                            {elem.user_warehouse === 'Оберіть відділення' ? '' : 'Відділення'}
                          </th>
                          <th>Дата</th>
                        </tr>
                        <tr>
                          <td>{elem.goods_amount}</td>
                          <td>{elem.goods_cost}</td>
                          <td>{elem.total}</td>
                          <td>{elem.user_delivery}</td>
                          <td>
                            {elem.user_name +
                              ' ' +
                              elem.user_usersecondname +
                              ' ' +
                              elem.user_phone +
                              ' ' +
                              elem.user_city}
                          </td>
                          <td>{elem.user_deliverycityArea}</td>
                          <td>
                            {elem.user_warehouse === 'Оберіть відділення'
                              ? ''
                              : elem.user_warehouse}
                          </td>
                          <td>{elem.date.slice(0, 16)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                </ul>
              );
            })
            .reverse()
        : ''}
    </div>
  );
}
