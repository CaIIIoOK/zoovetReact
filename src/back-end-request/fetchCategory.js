import axios from 'axios';
import { categoryDisplay } from '../redux/actions/categorys';
import { URL } from './config';

const fetchCategory = () => (dispatch) => {
  try {
    axios.get(`${URL}/category`).then(({ data }) => {
      return dispatch(categoryDisplay(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchCategory;
