import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { URL } from './config';
axios.defaults.withCredentials = true;

const fetchChangeUserData = (data) => (dispatch) => {
  try {
    const MySwal = withReactContent(Swal);
    let url = `${URL}/change-user-data`;
    axios
      .post(url, {
        data,
      })
      .then(function ({ data }) {
        if (data === 1) {
          MySwal.fire({
            title: 'Дані змінено',
            icon: 'success',
            confirmButtonText: 'Ок',
          });
        } else {
          MySwal.fire({
            title: 'Помилка',
            icon: 'error',
            confirmButtonText: 'Ок',
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchChangeUserData;
