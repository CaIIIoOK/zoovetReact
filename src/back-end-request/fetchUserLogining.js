import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import fetchUserData from '../back-end-request/fetchUserData';
import { URL } from './config';
axios.defaults.withCredentials = true;

const fetchUserLogining = (data) => (dispatch) => {
  try {
    let url = `${URL}/user-login`;
    axios
      .post(url, {
        data,
      })
      .then(function ({ data }) {
        if (data.status === 'sucsess') {
          dispatch(fetchUserData(data.hash));
        }
        if (data === 'denied') {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: 'Невірний логін або пароль',
            icon: 'error',
            confirmButtonText: 'Ок',
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserLogining;
