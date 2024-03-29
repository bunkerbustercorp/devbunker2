import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { createNetworkInterface, ApolloClient } from 'react-apollo';
import storage from 'helpers/storage';


/* load modules */
import base from './modules/base';
import form from './modules/form';
import register from './modules/register';
import write from './modules/write';
import main from './modules/main';
import my from './modules/my';

// Initialize Apollo ApolloClient
const networkInterface = createNetworkInterface({
    uri: '/graphql'
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if(!req.options.headers) {
            req.options.headers = {}; // 존재하지 않으면 생성한다
        }
        const token = storage.get('token');
        if(token) {
            req.options.headers['x-access-token'] = token;
        }
        next();
    }
}]);

export const client = new ApolloClient({
    networkInterface
});





/* configure middleware */
const middlewares = [promiseMiddleware(), client.middleware()];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

/* combine the reducers */
const reducer = combineReducers({
    apollo: client.reducer(),
    base,
    form,
    register,
    write,
    main,
    my
    
});

const configureStore = (initialState) => 
    createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;