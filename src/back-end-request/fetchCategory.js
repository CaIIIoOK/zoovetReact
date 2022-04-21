import axios from 'axios';
import { categoryDisplay } from '../redux/actions/categorys';

const fetchCategory = () => (dispatch) => {
  try {
    axios.get('http://localhost:3001/category').then(({ data }) => {
      return dispatch(categoryDisplay(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchCategory;
