import axios from 'axios';
import { getAdminOrdersAction, setOrderForPrint } from '../redux/actions/getAdminOrders';
axios.defaults.withCredentials = true;

const fetchAdminOrders = (id, total) => (dispatch) => {
  try {
    let orderId = `&id=${id}`;
    if (!id) {
      orderId = '';
    }
    axios.get(`/get-admin-orders?${orderId}`).then(({ data }) => {
      if (id) {
        let total = data[0].user_order.reduce((sum, el) => el.price * el.quantity + sum, 0);
        dispatch(setOrderForPrint(data[0], total));
      }
      return dispatch(getAdminOrdersAction(data));
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchChangeAdminOrders = (data) => (dispatch) => {
  try {
    const url = `/change-admin-orders`;
    axios.post(url, {
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export { fetchAdminOrders, fetchChangeAdminOrders };
