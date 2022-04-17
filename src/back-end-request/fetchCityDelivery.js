import axios from 'axios';
import { setCityDelivery } from '../redux/actions/setCityDelivery';

const fetchCityDelivery = (data) => (dispatch) => {
  const url = 'http://localhost:3001/delivery-city';
  axios
    .post(url, {
      data,
    })
    .then(({ data }) => {
      if (data.success) {
        return dispatch(setCityDelivery(data.data[0].Addresses));
      }
    });
};

export default fetchCityDelivery;
