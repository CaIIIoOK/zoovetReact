import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { setUserHashAction } from '../redux/actions/setUserDataAction';

const fetchValidationHash = (data) => (dispatch) => {
  try {
    const MySwal = withReactContent(Swal);
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
          dispatch(setUserHashAction(data.hash));
        }
        if (data === 'denied') {
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
