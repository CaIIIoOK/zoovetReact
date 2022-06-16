import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { URL } from './config';
axios.defaults.withCredentials = true;

const fetchDeleteReview = (data) => (dispatch) => {
  try {
    const MySwal = withReactContent(Swal);
    let url = `/delete-review`;
    axios
      .post(url, {
        data,
      })
      .then(function ({ data }) {
        if (data === 1) {
          MySwal.fire({
            title: 'Відгук видалено',
            icon: 'success',
            confirmButtonText: 'Ок',
            willClose: () => {
              return window.location.reload();
            },
          });
        } else {
          MySwal.fire({
            title: 'Виникла помилка',
            icon: 'error',
            confirmButtonText: 'Ок',
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchDeleteReview;
