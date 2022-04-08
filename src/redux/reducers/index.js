import { combineReducers } from 'redux';
import cartReduce from './cart';
import categorys from './categorys';
import getGoods from './goods';
import cartStatus from './cartStatus';

const rootReducer = combineReducers({
  cartReduce,
  categorys,
  getGoods,
  cartStatus,
});

export default rootReducer;
