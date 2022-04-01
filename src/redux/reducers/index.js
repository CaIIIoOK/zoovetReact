import { combineReducers } from 'redux';
import cartReduce from './cart';
import categorys from './categorys';
import getGoods from './goods';

const rootReducer = combineReducers({
  cartReduce,
  categorys,
  getGoods,
});

export default rootReducer;
