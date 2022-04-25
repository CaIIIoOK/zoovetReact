import axios from 'axios';
import { setUserDataAction } from '../redux/actions/setUserDataAction';
axios.defaults.withCredentials = true;

const fetchUserData = (hash) => (dispatch) => {
  try {
    let url = `http://localhost:3001/get-user-data`;
    axios
      .post(url, {
        hash,
      })
      .then(function ({ data }) {
        dispatch(
          setUserDataAction(
            data[0].user_login,
            data[0].user_name,
            data[0].id,
            data[0].user_usersecondname,
            data[0].user_email,
            data[0].user_phone,
          ),
        );
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserData;
