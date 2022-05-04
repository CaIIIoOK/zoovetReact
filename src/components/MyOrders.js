import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchUserOrders from '../back-end-request/fetchUserOrders';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(({ userDataReduser }) => userDataReduser);
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );

  React.useEffect(() => {
    dispatch(fetchUserOrders(cookie));
  }, []);
  return (
    <div className="my-order">
      <h2>Мої замовлення</h2>
      <ul>
        {orders.map((elem) => {
          return <li>Кількість:{elem.goods_amount}</li>;
        })}
      </ul>
    </div>
  );
};

export default MyOrders;
