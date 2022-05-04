import axios from 'axios';
import { setUserOrders } from '../redux/actions/setUserDataAction';

const fetchUserOrders = (login) => (dispatch) => {
  try {
    let url = `http://localhost:3001/get-user-orders`;
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
