import { combineReducers } from 'redux';
import cartReduce from './cart';
import categorys from './categorys';
import getGoods from './goods';
import cartStatus from './cartStatus';
import cityDelivery from './cityDelivery';
import userDataReduser from './userDataReduser';
import searchReduser from './searchReduser';
import adminOrders from './adminOrders';

const rootReducer = combineReducers({
  cartReduce,
  categorys,
  getGoods,
  cartStatus,
  cityDelivery,
  userDataReduser,
  searchReduser,
  adminOrders,
});

export default rootReducer;
