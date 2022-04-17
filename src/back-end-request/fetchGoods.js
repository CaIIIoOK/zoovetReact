import axios from 'axios';
import { goodsDisplay } from '../redux/actions/goods';

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

export default fetchGoods;