import { combineReducers } from 'redux';
import cartOpened from './cart';
import categorys from './categorys';
import getGoods from './goods';

const rootReducer = combineReducers({
  cartOpened,
  categorys,
  getGoods,
});

export default rootReducer;
