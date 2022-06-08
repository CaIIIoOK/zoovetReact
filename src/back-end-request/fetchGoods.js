import axios from 'axios';
import { goodsDisplay } from '../redux/actions/goods';
import { URL } from './config';

const fetchGoods = (currentPage, perPage, category) => (dispatch) => {
  try {
    let catgoryId = `&categoty=${category}`;
    if (!category) {
      catgoryId = '';
    }
    axios({
      method: 'GET',
      url: `${URL}/goods?&perpage=${perPage}&current=${currentPage}${catgoryId}`,
    }).then(({ data }) => {
      let productsWithCartStatus = data.goods.map((item) => {
        item.isInCart = false;
        return item;
      });
      return dispatch(goodsDisplay(productsWithCartStatus, data.count[0].count));
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchGoods;
