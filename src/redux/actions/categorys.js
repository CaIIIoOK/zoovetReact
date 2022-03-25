import axios from 'axios';

const categoryShow = (name) => ({
  type: 'SHOW_CAT',
  name,
});

const fetchCategory = () => (dispatch) => {
  axios.get('http://localhost:3001/category').then(({ data }) => {
    return dispatch(categoryShow(data));
  });
};

export { categoryShow, fetchCategory };
