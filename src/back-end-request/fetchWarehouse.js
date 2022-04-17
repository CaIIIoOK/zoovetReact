import axios from 'axios';
import { setDeliveryWarehouse } from '../redux/actions/setCityDelivery';

const fetchWarehouse = (data) => (dispatch) => {
  const url = 'http://localhost:3001/warehouse';
  axios
    .post(url, {
      data,
    })
    .then(({ data }) => {
      if (data.success) {
        return dispatch(setDeliveryWarehouse(data.data));
      }
    });
};

export default fetchWarehouse;
