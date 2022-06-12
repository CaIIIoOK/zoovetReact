import axios from 'axios';
axios.defaults.withCredentials = true;

const fetchChangeProdData = (data) => (dispatch) => {
  try {
    let url = `/change-prod-data-all`;
    axios.post(url, {
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchChangeProdData;
