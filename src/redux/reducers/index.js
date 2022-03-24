import { combineReducers } from 'redux';
import cartOpened from './cart';

const rootReducer = combineReducers({
  cartOpened,
});

export default rootReducer;
