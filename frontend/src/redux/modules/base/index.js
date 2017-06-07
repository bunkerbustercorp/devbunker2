import { combineReducers } from 'redux';
import modal from './modal'; 
import header from './header';
import auth from './auth';
import user from './user';
import leftbarmenu from './leftbarmenu';
import post from './post';

const common = combineReducers({
    modal, header, auth, user, leftbarmenu, post
});

export default common;