import { createAction, handleActions } from 'redux-actions';
import createPromiseAction from 'helpers/createPromiseAction';
import pender from 'helpers/pender';

import { Map } from 'immutable';

import * as post from 'helpers/WebApi/user/post';

/* actions */
const INITIALIZE = 'write/INITIALIZE';

const TITLE_CHANGE = 'write/TITLE_CHANGE';
const MARKDOWN_CHANGE = 'write/MARKDOWN_CHANGE';
const FULLSCREEN_SET = 'write/FULLSCREEN_SET';
const SCROLL_PERCENTAGE_SET = 'write/SCROLL_PERCENTAGE_SET';
const IS_LASTLINE_SET = 'write/IS_LASTLINE_SET';

const POST_CREATE = 'write/POST_CREATE';
const POST_UPDATE = 'write/POST_UPDATE';

const POST_INIT = 'write/POST_INIT';

const POSTID_SET = 'write/POSTID_SET';
const ISTEMP_SET = 'write/ISTEMP_SET';

/* action creators */
export const initialize = createAction(INITIALIZE);

export const changeTitle = createAction(TITLE_CHANGE);
export const changeMarkdown = createAction(MARKDOWN_CHANGE);
export const setFullscreen = createAction(FULLSCREEN_SET);
export const setScrollPercentage = createAction(SCROLL_PERCENTAGE_SET);
export const setIsLastLine = createAction(IS_LASTLINE_SET);

export const createPost = createPromiseAction(POST_CREATE, post.createPost);
export const updatePost = createPromiseAction(POST_UPDATE, post.updatePost);

export const initPost = createAction(POST_INIT);

export const setPostId = createAction(POSTID_SET);
export const setIsTemp = createAction(ISTEMP_SET);

/* initialState */
const initialState = Map({
    pending: Map({
        createPost: false,
        updatePost: false
    }),
    editor: Map({
        title: '',
        markdown: '',
        fullscreen: false,
        scrollPercentage: 0,
        isLastLine: false
    }),
    workingPost: Map({
        postId: null,
        isTemp: true
    })
})

/* reducer */
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,

    [POST_INIT]: (state, action) => {
        const editor = {
                title: '',
                markdown: '',
                fullscreen: false,
                scrollPercentage: 0,
                isLastLine: false
            };
        const workingPost = {
            postId: null,
            isTemp: true
        };
        state.set('editor', Map(editor));
        state.set('workingPost', Map(workingPost));
    },


    [POSTID_SET]: (state, action) => (
        state.setIn(['workingPost', 'postId'], action.payload)
    ),
    [ISTEMP_SET]: (state, action) => (
        state.setIn(['workingPost', 'isTemp'], action.payload)
    ),


    [TITLE_CHANGE]: (state, action) => (
        state.setIn(['editor', 'title'], action.payload)
    ),
    [MARKDOWN_CHANGE]: (state, action) => (
        state.setIn(['editor', 'markdown'], action.payload)
    ),
    [FULLSCREEN_SET]: (state, action) => (
        state.setIn(['editor','fullscreen'], action.payload)
    ),
    [SCROLL_PERCENTAGE_SET]: (state, action) => (
        state.setIn(['editor', 'scrollPercentage'], action.payload)
    ),
    [IS_LASTLINE_SET]: (state, action) => {
        // 마지막 줄이면 우측 preview 도 같이 스크롤되게끔
        // 방금 수정한 줄이 맨 마지막 줄인지 기록한다
        const current = state.getIn(['editor', 'isLastLine']);
        if(current===action.payload) {
            return state;
        } else {
            return state.setIn(['editor', 'isLastLine'], action.payload);
        }
    },

    // 포스트 생성
    ...pender({
        type: POST_CREATE,
        name: 'createPost',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            return state.set('workingPost', Map(data));
        }
    }),


    // 포스트 업데이트
    ...pender({
        type: POST_UPDATE,
        name: 'updatePost',
        onFulfill: (state, action) => {
            const { data } = action.payload;
            return state.set('workingPost', Map(data));
        }
    })

}, initialState);