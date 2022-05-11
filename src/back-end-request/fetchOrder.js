import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const fetchOrder = (data) => {
  try {
    const MySwal = withReactContent(Swal);
    let url = `/order`;
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
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchOrder;
