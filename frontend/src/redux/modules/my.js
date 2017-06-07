import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import * as post from 'helpers/WebApi/post/post';
import pender from 'helpers/pender';

const GET_POST_BY_POSTID = "my/GET_POST_BY_POSTID";
const GET_POST_BY_USERID = "my/GET_POST_BY_ID";

/* action creators */
export const getPostByPostId = (postId) => ({
    type: GET_POST_BY_POSTID,
    payload: {
        promise: post.getPostByPostId(postId)
    }
});

/* action creators */
export const getPostByUserId = (userId) => ({
    type: GET_POST_BY_USERID,
    payload: {
        promise: post.getPostByUserId(userId)
    }
});

/* initialState */
const initialState = Map({
    pending: Map({
        getpostbyuserid: false
    }),
    posts: List([
        Map({
            userId: '',
            title: '',
            content: '',
            releaseDate: '',
            isTemp: ''
        })
    ])
})

/* reducer */
export default handleActions({
    ...pender({
        type: GET_POST_BY_POSTID,
        name: 'getpostbypostid',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            return state.set('post', data);
        }
    }),

    ...pender({
        type: GET_POST_BY_USERID,
        name: 'getpostbyuserid',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            const posts = List((data).map((item)=>Map(item)));
            return state.set('posts', posts);
        }
    })
}, initialState);