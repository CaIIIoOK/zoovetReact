import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const fetchRegistration = (data) => {
  const MySwal = withReactContent(Swal);
  let url = `http://localhost:3001/registration`;
  axios
    .post(url, {
      data,
    })
    .then(function (response) {
      if (response.data === 1) {
        MySwal.fire({
          title: 'Успішна реєстрація',
          icon: 'success',
          confirmButtonText: 'Ок',
          willClose: () => {
            return (window.location.pathname = '/user-login');
          },
        });
      }
      if (response.data === 2) {
        MySwal.fire({
          title: 'Помилка',
          text: `'${data.userlogin} - логін зайнятий'`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return false;
      }
      if (response.data === 3) {
        MySwal.fire({
          title: 'Помилка',
          text: `'${data.email} - email зайнятий'`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return false;
      }
      if (response.data === 4) {
        MySwal.fire({
          title: 'Помилка',
          text: `Виникла помилка, перевірте правильність введених даних`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return false;
      }
    });
};

export default fetchRegistration;