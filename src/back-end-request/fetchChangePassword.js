import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
axios.defaults.withCredentials = true;

const fetchChangePassword = (data) => (dispatch) => {
  try {
    const MySwal = withReactContent(Swal);
    let url = `/change-password`;
    axios
      .post(url, {
        data,
      })
      .then(function ({ data }) {
        if (data === 1) {
          MySwal.fire({
            title: 'Пароль змінено',
            icon: 'success',
            confirmButtonText: 'Ок',
            willClose: () => {
              return (window.location.pathname = '/my-office');
            },
          });
        } else {
          MySwal.fire({
            title: 'Поточний пароль не вірний',
            icon: 'error',
            confirmButtonText: 'Ок',
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchChangePassword;
