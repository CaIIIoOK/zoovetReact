import axios from 'axios';
import { setUserDataAction } from '../redux/actions/setUserDataAction';

const fetchUserData = (data) => (dispatch) => {
  try {
    let url = `http://localhost:3001/validate-user`;
    axios
      .post(url, {
        data,
      })
      .then(function ({ data }) {
        let d = data[0];
        dispatch(
          setUserDataAction(
            d.user_login,
            d.user_name,
            d.id,
            d.user_city,
            d.user_email,
            d.user_phone,
          ),
        );
      });
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserData;
