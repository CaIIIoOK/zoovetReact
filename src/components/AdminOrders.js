import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchAdminOrders, fetchChangeAdminOrders } from '../back-end-request/fetchAdminOrders';
import NewGoodsModal from './NewGoodsModal';

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { orders, totalPrice } = useSelector(({ adminOrders }) => adminOrders);
  const [showNewProdModal, setShowNewProdModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [orders]);

  const showOrderInformation = (e) => {
    e.target.offsetParent.nextElementSibling.style.display = 'flex';
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'inline';
    e.target.previousSibling.style.display = 'none';
  };
  const hideOrderInformation = (e) => {
    e.target.offsetParent.nextElementSibling.style.display = 'none';
    e.target.style.display = 'none';
    e.target.previousSibling.style.display = 'inline';
    e.target.previousElementSibling.previousElementSibling.style.display = 'flex';
  };
  const changeStatusDelivery = (e, id) => {
    let data = {
      value: e.target.value,
      id,
    };
    dispatch(fetchChangeAdminOrders(data));
  };

  return (
    <div className="my-orders">
      <h3>Замовлення</h3>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Link
          to="/admin-change-prod-all"
          style={{
            textAlign: 'center',
            margin: 10,
            fontSize: 15,
            padding: 5,
            backgroundColor: 'rgb(64, 252, 233)',
            borderRadius: 10,
            width: 150,
            textDecoration: 'none',
            color: 'black',
          }}>
          Редагувати товари або категорї
        </Link>
        <button
          style={{
            textAlign: 'center',
            margin: 10,
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
            .map((elem, idnex) => {
              return (
                <div className="user_order" key={elem.id}>
                  <div className="number_date_total_img">
                    <div className="date_price_block">
                      <div style={{ color: 'gray' }}>
                        № {elem.id} від {elem.date.slice(0, 10)}{' '}
                        <div className="order_status">
                          <p>
                            {elem.status === 0
                              ? 'Очікує дзвінка'
                              : elem.status === 1
                              ? 'Відправлено'
                              : elem.status === 2
                              ? 'Виконано'
                              : elem.status === 3
                              ? 'Відмова'
                              : ''}
                          </p>
                          <div
                            className={
                              elem.status === 1
                                ? 'purpAdm'
                                : elem.status === 2
                                ? 'blueAdm'
                                : elem.status === 3
                                ? 'greanAdm'
                                : 'redAdmn'
                            }></div>
                        </div>
                      </div>
                      <p>Загальна сума: {totalPrice[idnex]} грн.</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {elem.user_order.map((item, index) => {
                        return (
                          <img
                            src={item.img}
                            alt=""
                            key={index}
                            style={{ width: 25, marginRight: 5 }}></img>
                        );
                      })}
                    </div>
                    <img
                      src="./img/icons-arrow-orders-down.png"
                      alt=""
                      style={{ width: 20, cursor: 'pointer' }}
                      onClick={(e) => showOrderInformation(e)}
                    />
                    <img
                      src="./img/icons-arrow-orders-top.png"
                      alt=""
                      style={{ width: 20, cursor: 'pointer', display: 'none' }}
                      onClick={(e) => hideOrderInformation(e)}
                    />
                  </div>
                  <div className="information_order">
                    <div className="delivery_information_order">
                      <p style={{ color: 'gray', marginTop: 10 }}>Інформація про замовлення</p>
                      <p>{`${
                        elem.user_data.delivery === 'ukrp'
                          ? 'Укрпошта'
                          : elem.user_data.delivery === 'novap'
                          ? 'Нова пошта'
                          : ''
                      }`}</p>
                      <i>
                        {' '}
                        {`${elem.user_data.cityDelivery}${
                          elem.user_data.warehouse === 'Оберіть відділення'
                            ? ''
                            : ', ' + elem.user_data.warehouse
                        }`}
                      </i>
                      <p>{elem.user_data.username + ' ' + elem.user_data.usersecondname}</p>
                      <p>{elem.user_data.phone}</p>
                      <p>{elem.user_data.email}</p>
                      <p>{elem.user_data.city}</p>
                      <div className="buttons-admin-order">
                        <button
                          value={1}
                          style={{ backgroundColor: 'plum' }}
                          onClick={(e) => changeStatusDelivery(e, elem.id)}>
                          Відправлено
                        </button>
                        <button
                          value={2}
                          style={{ backgroundColor: 'rgb(67, 255, 79)' }}
                          onClick={(e) => changeStatusDelivery(e, elem.id)}>
                          Виконано
                        </button>
                        <button
                          value={3}
                          style={{ backgroundColor: 'rgb(245, 162, 39)' }}
                          onClick={(e) => changeStatusDelivery(e, elem.id)}>
                          Відмова
                        </button>
                      </div>
                    </div>
                    <div className="products_information_order">
                      <p style={{ color: 'gray', marginTop: 10, marginBottom: 10 }}>
                        Товари ZooVetAgro
                      </p>
                      {elem.user_order.map((item, index) => {
                        return (
                          <div className="prod_name_img_other" key={index}>
                            <img src={item.img} alt="" style={{ width: 40, margin: 5 }} />
                            <NavLink to={'/goods-solo?&id=' + item.id}>
                              <p>{item.name}</p>
                            </NavLink>
                            <table className="order_table">
                              <tbody>
                                <tr>
                                  <th>Ціна</th>
                                  <th>Кількість</th>
                                  <th>Сума</th>
                                </tr>
                                <tr>
                                  <td>{item.price} грн.</td>
                                  <td>{item.quantity} шт.</td>
                                  <td>{item.price * item.quantity} шт.</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()
        : ''}
    </div>
  );
}
