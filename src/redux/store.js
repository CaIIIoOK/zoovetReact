import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const composeEnchancers = compose;

const store = createStore(rootReducer, composeEnchancers(applyMiddleware(thunk)));

export default store;
