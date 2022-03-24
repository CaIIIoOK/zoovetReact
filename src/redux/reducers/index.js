import { combineReducers } from 'redux';
import cartOpened from './cart';
import categorys from './categorys';

const rootReducer = combineReducers({
  cartOpened,
  categorys,
});

export default rootReducer;
