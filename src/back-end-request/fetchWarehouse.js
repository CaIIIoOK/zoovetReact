import axios from 'axios';
import { setDeliveryWarehouse } from '../redux/actions/setCityDelivery';

const fetchWarehouse = (data) => (dispatch) => {
  try {
    const url = '/warehouse';
    axios
      .post(url, {
        data,
      })
      .then(({ data }) => {
        if (data.success) {
          return dispatch(setDeliveryWarehouse(data.data));
        }
        if (data.response) {
          return dispatch(setDeliveryWarehouse(data.data));
        } else {
          dispatch(setDeliveryWarehouse([]));
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchWarehouse;
