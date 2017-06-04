import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const MENU_ACTIVE = "base/leftbarmenu/MENU_ACTIVE";

/* action creates */
export const activeMenu = createAction(MENU_ACTIVE);

/* initialState */
const initialState = Map({
    activemenu: 0
});

export default handleActions({
    [MENU_ACTIVE]: (state, action) => {
        const activemenu = action.payload;
        return state.set('activemenu', activemenu);
    }
}, initialState);