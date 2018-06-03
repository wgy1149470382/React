import {createStore,applyMiddleware} from 'redux';

import rootReducer from './rootReducer.js';
import middleware from './middleware.js';

const store = createStore(rootReducer,applyMiddleware(middleware));

export default store;