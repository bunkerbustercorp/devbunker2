import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

import * as mainActions from 'redux/modules/main';
import * as myActions from 'redux/modules/my';
import * as writeActions from 'redux/modules/write';
import * as leftBarMenuActions from 'redux/modules/base/leftbarmenu';
import * as postActions from 'redux/modules/base/post';

import Container from 'components/Common/Container';
import { Post } from 'components/Base/Post';
import { MainComponent, PreviewList } from 'components/Main';

class MainPage extends Component {

    componentDidMount() {
        const { MainActions, LeftBarMenuActions } = this.props;
        MainActions.getPosts();
        LeftBarMenuActions.activeMenu("2");
    }

    componentWillUnmount() {
        const { LeftBarMenuActions } = this.props;
        LeftBarMenuActions.activeMenu("");
    }

    handlePost = (() => {
        const { PostActions, MainActions, MyActions, WriteActions } = this.props;
        return {
            onVisible: (postId) => {
                PostActions.openPostOption(postId);
            },
            onEdit: async (postId) => {
                const result = await MyActions.getPostByPostId(postId);
                const { data } = result.action.payload;
                await WriteActions.changeTitle(data.title);
                await WriteActions.changeMarkdown(data.content);
                await WriteActions.setPostId(data._id);
                await WriteActions.setIsTemp(data.isTemp);
                this.props.history.push('write');
                await PostActions.closePostOption();
            },
            onDelete: async (postId) => {
                await PostActions.deletePost(postId);
                await MainActions.getPosts();
                await PostActions.closePostOption();
            },
            onHide: () => {
                PostActions.closePostOption();
            }
        }
    })()

    render() {
        const { status: { main, user, post } } = this.props;
        const { handlePost } = this;

        const profile = user.get('profile');

        const posts = main.get('posts').map(
            (data, i) => (
            <Post
                key={i}
                {...data.toJS()}
                thisUserId={profile.get('userId')}
                username={profile.get('username')}
                visibleId={post.getIn(['postOption', 'visibleId'])}
                onVisible={handlePost.onVisible}
                onDelete={handlePost.onDelete}
                onEdit={handlePost.onEdit}
                onHide={handlePost.onHide}
            />
        ))

        return (
            <Container>
                <MainComponent>
                    <PreviewList>
                        {posts}
                    </PreviewList>
                </MainComponent>
            </Container>
        );
    }
}

// export default App;
export default withRouter(connect(
    state => ({
        status: {
            main: state.main,
            user: state.base.user,
            post: state.base.post,
        }
    }),
    dispatch => ({
        MainActions: bindActionCreators(mainActions, dispatch),
        MyActions: bindActionCreators(myActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
        LeftBarMenuActions: bindActionCreators(leftBarMenuActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(MainPage));