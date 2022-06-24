import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { URL } from './config';

const fetchOrder = (data) => {
  try {
    const MySwal = withReactContent(Swal);
    let url = `${URL}/order`;
    axios
      .post(url, {
        data,
      })
      .then(function (response) {
        if (response.data === 1) {
          MySwal.fire({
            title: 'Успішне замовлення',
            text: 'очікуйте на дзвінок',
            icon: 'success',
            confirmButtonText: 'Ок',
            willClose: () => {
              return (window.location.pathname = '/goods');
            },
          });
        }
        if (response.data === 0) {
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

export default fetchOrder;
