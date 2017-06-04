import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const USER_MENU_OPEN = "base/header/USER_MENU_OPEN";
const USER_MENU_CLOSE = "base/header/USER_MENU_CLOSE";

const LEFTBAR_SHOW = "base/header/LEFTBAR_SHOW";
const LEFTBAR_HIDE = "base/header/LEFTBAR_HIDE";

/* action creates */
export const openUserMenu = createAction(USER_MENU_OPEN);
export const closeUserMenu = createAction(USER_MENU_CLOSE);

export const showLeftbar = createAction(LEFTBAR_SHOW);
export const hideLeftbar = createAction(LEFTBAR_HIDE);

/* initialState */
const initialState = Map({
    leftbar: true,
    userMenu: Map({
        open: false
    })
});

export default handleActions({
    [USER_MENU_OPEN]: (state, action) => (
        state.setIn(['userMenu', 'open'], true)
    ),
    [USER_MENU_CLOSE]: (state,action) => (
        state.setIn(['userMenu', 'open'], false)
    ),
    [LEFTBAR_SHOW]: (state, action) => (
        state.set('leftbar', true)
    ),
    [LEFTBAR_HIDE]: (state, action) => (
        state.set('leftbar', false)
    )
}, initialState);