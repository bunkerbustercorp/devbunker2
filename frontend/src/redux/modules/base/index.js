import { combineReducers } from 'redux';
import modal from './modal'; 
import header from './header';
import auth from './auth';
import user from './user';
import leftbarmenu from './leftbarmenu';

const common = combineReducers({
    modal, header, auth, user, leftbarmenu
});

export default common;