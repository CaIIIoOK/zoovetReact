import { combineReducers } from 'redux';
import cartReduce from './cart';
import categorys from './categorys';
import getGoods from './goods';
import cartStatus from './cartStatus';
import cityDelivery from './cityDelivery';
import userDataReduser from './userDataReduser';

const rootReducer = combineReducers({
  cartReduce,
  categorys,
  getGoods,
  cartStatus,
  cityDelivery,
  userDataReduser,
});

export default rootReducer;
