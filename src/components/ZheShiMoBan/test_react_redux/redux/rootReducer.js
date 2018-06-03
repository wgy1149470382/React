import {combineReducers} from 'redux';

import ReducerClick from '../cmpclick/reducer.js';
import redCmpAsync from '../cmpasync/reducer.js';

const rootReducer = combineReducers({
    ReducerClick,
    redCmpAsync
});

export default rootReducer;