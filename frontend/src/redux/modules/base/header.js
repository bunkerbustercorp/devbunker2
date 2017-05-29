import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/* actions */
const SIDEBAR_SHOW = "base/header/SIDEBAR_SHOW";
const SIDEBAR_HIDE = "base/header/SIDEBAR_HIDE";

/* action creates */
export const showSidebar = createAction(SIDEBAR_SHOW);
export const hideSidebar = createAction(SIDEBAR_HIDE);

/* initialState */
const initialState = Map({
    sidebar: true
});

export default handleActions({
    [SIDEBAR_SHOW]: (state, action) => (
        state.set('sidebar', true)
    ),
    [SIDEBAR_HIDE]: (state, action) => (
        state.set('sidebar', false)
    )
}, initialState);