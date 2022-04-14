import axios from 'axios';
import { setSoloItemData } from '../redux/actions/goods';

const fetchGoodsSoloItem = (itemId) => (dispatch) => {
  axios({
    method: 'GET',
    url: `http://localhost:3001/goods-solo?&itemId=${itemId}`,
  }).then(({ data }) => {
    let productsWithCartStatus = data.map((item) => {
      item.isInCart = false;
      return item;
    });
    return dispatch(setSoloItemData(productsWithCartStatus));
  });
};

export default fetchGoodsSoloItem;
