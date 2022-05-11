import axios from 'axios';
import { searchGoodsByVal } from '../redux/actions/searchAction';

const fetchSearch = (data) => (dispatch) => {
  try {
    let url = `/search`;
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
