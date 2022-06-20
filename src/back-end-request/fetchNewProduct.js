import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
axios.defaults.withCredentials = true;

const fetchNewProduct = (data) => (dispatch) => {
  try {
    const MySwal = withReactContent(Swal);
    let url = `/new-product`;
    axios
      .post(url, {
        data,
      })
      .then(function ({ data }) {
        if (data === 1) {
          MySwal.fire({
            title: 'Створено новий товар',
            icon: 'success',
            confirmButtonText: 'Ок',
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

export default fetchNewProduct;
