import axios from 'axios';
import { categoryDisplay } from '../redux/actions/categorys';

const fetchCategory = () => (dispatch) => {
  axios.get('http://localhost:3001/category').then(({ data }) => {
    return dispatch(categoryDisplay(data));
  });
};

export default fetchCategory;
