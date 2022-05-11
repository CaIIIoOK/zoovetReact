import axios from 'axios';
import { setCityDelivery, setCityDeliveryJustin } from '../redux/actions/setCityDelivery';

const fetchCityDelivery = (data) => (dispatch) => {
  try {
    const url = '/delivery-city';
    axios
      .post(url, {
        data,
      })
      .then(({ data }) => {
        if (data.success) {
          return dispatch(setCityDelivery(data.data[0].Addresses));
        }
        if (data.response) {
          return dispatch(setCityDeliveryJustin(data.data));
        } else {
          dispatch(setCityDelivery([]));
          dispatch(setCityDeliveryJustin([]));
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchCityDelivery;
