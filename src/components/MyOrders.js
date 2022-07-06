import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const MyOrders = () => {
  const { orders, totalPrice } = useSelector(({ userDataReduser }) => userDataReduser);
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
    e.target.previousElementSibling.previousElementSibling.style.display = 'inline-block';
  };
  return (
    <div className="my-orders">
      <h3>Мої замовлення</h3>
      {orders.length !== 0
        ? orders.map((elem, idnex) => {
            return (
              <div className="user_order" key={elem.id}>
                <div className="number_date_total_img">
                  <div className="date_price_block">
                    <p style={{ color: 'gray' }}>
                      № {elem.id} від {elem.date.slice(0, 10) + ', ' + elem.date.slice(11, 19)}
                    </p>
                    <p>Загальна сума: {totalPrice[idnex]} грн.</p>
                  </div>
                  <div className="img_block_orders">
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
                  </div>
                  <div className="products_information_order">
                    <p style={{ color: 'gray', marginTop: 10 }}>Товари ZooVetAgro</p>
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
        : ''}
    </div>
  );
};

export default MyOrders;
