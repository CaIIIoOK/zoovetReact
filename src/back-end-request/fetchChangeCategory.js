import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
axios.defaults.withCredentials = true;

const fetchChangeCategory = (id, name) => (dispatch) => {
  try {
    const MySwal = withReactContent(Swal);
    let url = `/change-category`;
    axios
      .post(url, {
        id,
        name,
      })
      .then(function ({ data }) {
        if (data === 1) {
          MySwal.fire({
            title: 'Дані змінено',
            icon: 'success',
            confirmButtonText: 'Ок',
            willClose: () => {
              return window.location.reload();
            },
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

export default fetchChangeCategory;
