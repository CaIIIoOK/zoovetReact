import axios from 'axios';
import { setRandomGoods } from '../redux/actions/goods';
import { URL } from './config';

const fetchRandomGoods = () => (dispatch) => {
  try {
    axios.get(`${URL}/get-random-goods`).then(({ data }) => {
      return dispatch(setRandomGoods(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchRandomGoods;
