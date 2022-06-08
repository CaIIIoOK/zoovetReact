import axios from 'axios';
import getAdminOrdersAction from '../redux/actions/getAdminOrders';
import { URL } from './config';
axios.defaults.withCredentials = true;

const fetchAdminOrders = () => (dispatch) => {
  try {
    axios.get(`${URL}/get-admin-orders`).then(({ data }) => {
      return dispatch(getAdminOrdersAction(data));
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchChangeAdminOrders = (data) => (dispatch) => {
  try {
    const url = `${URL}/get-admin-orders`;
    axios
      .post(url, {
        data,
      })
      .then(({ data }) => {
        if (!data) {
          console.log('error cange staus');
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export { fetchAdminOrders, fetchChangeAdminOrders };
