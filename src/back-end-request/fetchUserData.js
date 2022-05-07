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
            data.reqUser[0].user_login,
            data.reqUser[0].permission,
            data.reqUser[0].user_name,
            data.reqUser[0].id,
            data.reqUser[0].user_usersecondname,
            data.reqUser[0].user_email,
            data.reqUser[0].user_phone,
            data.orders,
          ),
        );
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserData;
