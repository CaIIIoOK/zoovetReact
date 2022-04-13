import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const fetchOrder = (data) => {
  const MySwal = withReactContent(Swal);
  let url = `http://localhost:3001/order`;
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
};

export default fetchOrder;
