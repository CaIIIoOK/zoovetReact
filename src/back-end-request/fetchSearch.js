import axios from 'axios';
import { searchGoodsByVal } from '../redux/actions/searchAction';
import { URL } from './config';

const fetchSearch = (data) => (dispatch) => {
  try {
    let url = `${URL}/search`;
    axios
      .post(url, {
        data,
      })
      .then(({ data }) => {
        return dispatch(searchGoodsByVal(data));
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchSearch;
