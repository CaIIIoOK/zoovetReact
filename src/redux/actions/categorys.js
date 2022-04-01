import axios from 'axios';

const categoryDisplay = (name) => ({
  type: 'DISPLAY_CATEGORY',
  name,
});

const fetchCategory = () => (dispatch) => {
  axios.get('http://localhost:3001/category').then(({ data }) => {
    return dispatch(categoryDisplay(data));
  });
};

export { fetchCategory };
