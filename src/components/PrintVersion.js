import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchAdminOrders } from '../back-end-request/fetchAdminOrders';

const PrintVersion = () => {
  const dispatch = useDispatch();
  const { printOrder, printTotal } = useSelector(({ adminOrders }) => adminOrders);
  const [queryParams] = useSearchParams();
  const idQuery = queryParams.get('order-id');

  React.useEffect(() => {
    function isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    }
    if (isEmpty(printOrder)) {
      dispatch(fetchAdminOrders(idQuery));
    }
  }, []);
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes();
  return (
    <div className="print_order">
      {printOrder.id && (
        <>
          <h4>
            Видаткова накладна № {printOrder.id}. Від {date + ', ' + time}
          </h4>
          <p>
            Покупець:{' '}
            <span>
              {printOrder.user_data.username} {printOrder.user_data.usersecondname}
            </span>
            ,{' '}
            <span>
              Телефон: {printOrder.user_data.phone}, Email: {printOrder.user_data.email}
            </span>
          </p>
          <p>
            Доставка:
            <span>
              {' '}
              {`${
                printOrder.user_data.delivery === 'ukrp'
                  ? 'Укрпошта'
                  : printOrder.user_data.delivery === 'novap'
                  ? 'Нова пошта'
                  : ''
              }`}
              , Населенний пункт:{' '}
              {printOrder.user_data.cityDelivery === ''
                ? 'Не вказано'
                : printOrder.user_data.cityDelivery}
              , Відділення:{' '}
              {printOrder.user_data.warehouse === 'Оберіть відділення'
                ? 'Не вказано'
                : ', ' + printOrder.user_data.warehouse}
            </span>
          </p>
          <p>
            {' '}
            <span>
              {printOrder.user_data.city !== '' ? 'Місто: ' + printOrder.user_data.city : ''}
            </span>
          </p>
          <p>
            Дата замовлення:{' '}
            <span>{printOrder.date.slice(0, 10) + ', ' + printOrder.date.slice(11, 19)}</span>
          </p>
          <div className="tableContainer">
            <table>
              <tbody>
                <tr>
                  <th>№</th>
                  <th>Найменування товару</th>
                  <th>Кількість</th>
                  <th>Ціна</th>
                  <th>Сума</th>
                </tr>
                {printOrder.user_order.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price} грн.</td>
                      <td>{item.price * item.quantity} грн.</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>Всього: {printTotal} грн.</p>
          <button className="print_button" onClick={() => window.print()}>
            Роздрукувати
          </button>
        </>
      )}
    </div>
  );
};

export default PrintVersion;
