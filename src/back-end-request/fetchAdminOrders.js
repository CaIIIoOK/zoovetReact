import axios from 'axios';
import { getAdminOrdersAction } from '../redux/actions/setUserDataAction';

const fetchAdminOrders = () => (dispatch) => {
  try {
    axios.get('/get-admin-orders').then(({ data }) => {
      return dispatch(getAdminOrdersAction(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchAdminOrders;
