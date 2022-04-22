import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import fetchUserData from './fetchUserData';

const fetchValidationHash = (data) => (dispatch) => {
  try {
    let url = `http://localhost:3001/user-login`;
    axios
      .post(
        url,
        {
          data,
        },
        { withCredentials: true },
      )
      .then(function ({ data }) {
        if (data.status === 'sucsess') {
          dispatch(fetchUserData(data.hash));
        }
        if (data === 'denied') {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: 'Невірний логін бо пароль',
            icon: 'error',
            confirmButtonText: 'Ок',
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchValidationHash;
