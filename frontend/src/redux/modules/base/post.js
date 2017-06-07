import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as post from 'helpers/WebApi/post/post';
import pender from 'helpers/pender';

/* actions */
const POST_OPTION_OPEN = "base/header/POST_OPTION_OPEN";
const POST_OPTION_CLOSE = "base/header/POST_OPTION_CLOSE";

const DELETE_POST = "main/DELETE_POST";

/* action creates */
export const openPostOption = createAction(POST_OPTION_OPEN);
export const closePostOption = createAction(POST_OPTION_CLOSE);



export const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: {
        promise: post.deletePost(postId)
    }
})

/* initialState */
const initialState = Map({
    postOption: Map({
        visibleId: ''
    })
});

export default handleActions({
    [POST_OPTION_OPEN]: (state, action) => {
        const visibleId = action.payload;
        return state.setIn(['postOption', 'visibleId'], visibleId)
    },
    [POST_OPTION_CLOSE]: (state,action) => (
        state.setIn(['postOption', 'visibleId'], '')
    ),
    ...pender({
        type: DELETE_POST,
        name: 'deletepost',
        onFulfill: (state, action) => {
        }
    })
}, initialState);