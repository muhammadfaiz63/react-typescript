import {createStore, applyMiddleware} from 'redux';

import reducers from './reducers';
import middleware from './middleware';

const store = createStore(reducers, applyMiddleware(...middleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
