import { combineReducers } from 'redux';
import modal from './modal'; 
import header from './header';
import sidebarmenu from './sidebarmenu';

const common = combineReducers({
    modal, header, sidebarmenu
});

export default common;