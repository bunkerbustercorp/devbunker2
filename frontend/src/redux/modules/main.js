import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import * as post from 'helpers/WebApi/post/post';
import pender from 'helpers/pender';


const GET_POST_BY_ID = "main/GET_POST_BY_ID";
const GET_POSTS = "main/GET_POST";


/* action creators */

export const getPostById = (postId) => ({
    type: GET_POST_BY_ID,
    payload: {
        promise: post.getPostByID(postId)
    }
});

export const getPosts = () => ({
    type: GET_POSTS,
    payload: {
        promise: post.getPosts()
    }
});

/* initialState */
const initialState = Map({
    pending: Map({
        getpostbyid: false,
        getposts: false
    }),
    posts: List([
        Map({
            _id:'',
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
        type: GET_POST_BY_ID,
        name: 'getpostbyid',
        onFulfill: (state, action) => {
            //const { data } = action.payload;
            return
        }
    }),
    ...pender({
        type: GET_POSTS,
        name: 'getposts',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            const posts = List((data).map((item)=>Map(item)));
            return state.set('posts', posts);
        }
    }),
}, initialState);