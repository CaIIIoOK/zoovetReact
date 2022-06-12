import axios from 'axios';
import { URL } from './config';

const removeCookie = (data) => (dispatch) => {
  try {
    const url = `${URL}/remove-cookie`;
    axios.post(url);
  } catch (error) {
    console.log(error);
  }
};

export default removeCookie;
