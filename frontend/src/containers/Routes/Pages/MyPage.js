import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

import * as myActions from 'redux/modules/my';
import * as leftBarMenuActions from 'redux/modules/base/leftbarmenu';

import Container from 'components/Common/Container';
import { MyComponent, MyHeader, MyThumbnail, MyMenuBar, MyContent } from 'components/My';

import { Post } from 'components/Base/Post';

class MyPage extends Component {

    componentDidMount() {
        const { status: { user }, MyActions, LeftBarMenuActions } = this.props;
        MyActions.getPostByUserId(user.getIn(['profile', 'userId']));
        LeftBarMenuActions.activeMenu("1");
    }

    componentWillUnmount() {
        const { LeftBarMenuActions } = this.props;
        LeftBarMenuActions.activeMenu("");
    }

    handleMyHeader = (() => {
        return {
            onWrite: () => {
                this.props.history.push("/write");
            },
            onmypage: () => {
            },
            logout: () => {
            },
            close: () => {
            }
        }
    })()

    render() {
        const { status: { user, my } } = this.props;
        const { handleMyHeader } = this;

        const profile = user.get('profile');

        const posts = my.get('posts').map(
            (data, i) => (
            <Post
                key={i}
                {...data.toJS()}
                thisUserId={profile.get('userId')}
                username={profile.get("username")}
            />
        ))

        return (
            <Container>
                <MyComponent>
                    <MyHeader>
                        <MyThumbnail thumbnail={profile.get('thumbnail')}>
                        </MyThumbnail>
                        <MyMenuBar onWrite={handleMyHeader.onWrite}>
                            {profile.get("username")}
                        </MyMenuBar>
                    </MyHeader>
                    <MyContent>
                        {posts}
                    </MyContent>
                </MyComponent>
            </Container>
        );
    }
}

// export default App;
export default withRouter(connect(
    state => ({
        status: {
            user: state.base.user,
            my: state.my
        }
    }),
    dispatch => ({
        MyActions: bindActionCreators(myActions, dispatch),
        LeftBarMenuActions: bindActionCreators(leftBarMenuActions, dispatch)
    })
)(MyPage));