import axios from 'axios';
import { setUserOrders } from '../redux/actions/setUserDataAction';
import { URL } from './config';
axios.defaults.withCredentials = true;

const fetchUserOrders = (login) => (dispatch) => {
  try {
    let url = `${URL}/get-user-orders`;
    axios
      .post(url, {
        login,
      })
      .then(function ({ data }) {
        dispatch(setUserOrders(data));
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserOrders;
