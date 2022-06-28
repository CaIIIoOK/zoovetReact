import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReduce'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnchancers = compose;
const store = createStore(persistedReducer, composeEnchancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);

export default store;
