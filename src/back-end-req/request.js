import axios from 'axios';
import { goodsDisplay } from '../redux/actions/goods';
import { categoryDisplay } from '../redux/actions/categorys';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const fetchGoods = (currentPage, perPage, category) => (dispatch) => {
  let catgoryId = `&categoty=${category}`;
  if (!category) {
    catgoryId = '';
  }
  axios({
    method: 'GET',
    url: `http://localhost:3001/goods?&perpage=${perPage}&current=${currentPage}${catgoryId}`,
  }).then(({ data }) => {
    let productsWithCartStatus = data.goods.map((item) => {
      item.isInCart = false;
      return item;
    });
    return dispatch(goodsDisplay(productsWithCartStatus, data.count[0].count));
  });
};

const fetchCategory = () => (dispatch) => {
  axios.get('http://localhost:3001/category').then(({ data }) => {
    return dispatch(categoryDisplay(data));
  });
};

const registration = (data) => {
  const MySwal = withReactContent(Swal);
  let url = `http://localhost:3001/registration`;
  axios
    .post(url, {
      data,
    })
    .then(function (response) {
      if (response.data === 0) {
        MySwal.fire({
          title: 'Warning',
          text: 'Логін повинен містити тільки латинські символи (не більше 16)',
          icon: 'info',
          confirmButtonText: 'Ok',
        });
        return false;
      }
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
    });
};

export { fetchGoods, fetchCategory, registration };
