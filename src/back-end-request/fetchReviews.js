import axios from 'axios';
import { URL } from './config';
import { setReviews } from '../redux/actions/goods';

const fetchReviews = (itemId) => (dispatch) => {
  try {
    axios({
      method: 'GET',
      url: `${URL}/get-reviews?&itemId=${itemId}`,
    }).then(({ data }) => {
      return dispatch(setReviews(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchReviews;
