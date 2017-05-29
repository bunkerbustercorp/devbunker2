import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

// load modules
import base from './modules/base';

// configure middleware
const middlewares = [promiseMiddleware()];

// apply redux-logger when DEBUG mode
//if(process.env.NODE_ENV === 'development') {
    //const createLogger = require('redux-logger');
   // const logger = createLogger();
    //middlewares.push(logger);
//}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

/* combine the reducers */
const reducer = combineReducers({
    base
});
const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;