import { combineReducers } from 'redux';
import modal from './modal'; 
import header from './header';
import auth from './auth';
import user from './user';
import sidebarmenu from './sidebarmenu';

const common = combineReducers({
    modal, header, auth, user, sidebarmenu
});

export default common;