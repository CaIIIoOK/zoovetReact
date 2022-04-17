import { combineReducers } from 'redux';
import cartReduce from './cart';
import categorys from './categorys';
import getGoods from './goods';
import cartStatus from './cartStatus';
import cityDelivery from './cityDelivery';

const rootReducer = combineReducers({
  cartReduce,
  categorys,
  getGoods,
  cartStatus,
  cityDelivery,
});

export default rootReducer;
