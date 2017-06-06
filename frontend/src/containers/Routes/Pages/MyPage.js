import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

import * as leftbarmenuActions from 'redux/modules/base/leftbarmenu';

import Container from 'components/Common/Container';
import { LeftBar, LeftBarMenu, LeftBarMenuSubs } from 'components/Base/LeftBar';
import { MyComponent, MyHeader, MyThumbnail, MyMenuBar, MyContent } from 'components/My';

import { Post, PostHeader, PostContent, PostFooter } from 'components/Base/Post';

class MyPage extends Component {
    handleLeftBar = (() => {
        const { LeftbarMenuActions } = this.props;
        return {
            setActive: (activeMenu) => {
                LeftbarMenuActions.activeMenu(activeMenu);
            }
        }
    })()

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
        const { status: { header, leftbarmenu, user } } = this.props;
        const { handleLeftBar, handleMyHeader } = this;

        const profile = user.get('profile');
        const activemenu = leftbarmenu.get('activemenu');

        return (
            <Container>
                <LeftBar visible={header.get('leftbar')}>
                    <LeftBarMenu 
                        ItemID="1"
                        active={activemenu}
                        text="BunkerBuster"
                        onClick={handleLeftBar.setActive}
                    />
                    <LeftBarMenu
                        ItemID="2"
                        active={activemenu}
                        text="뉴스피드"
                        onClick={handleLeftBar.setActive}
                    />
                    <LeftBarMenu ItemID="3"
                        active={activemenu}
                        text="인기"
                        onClick={handleLeftBar.setActive}
                    />
                    <LeftBarMenu
                        ItemID="4"
                        active={activemenu}
                        text="카테고리"
                        onClick={handleLeftBar.setActive}
                    />
                    <LeftBarMenuSubs className="leftbarmenu-header"
                        ItemID="5"
                        active={activemenu}
                        text="구독"
                        onClick={handleLeftBar.setActive}
                    />
                    <LeftBarMenuSubs
                        className="leftbarmenu-subs"
                        ItemID="6"
                        active={activemenu}
                        text="JSP 강좌" 
                        count="5" 
                        onClick={handleLeftBar.setActive}/>
                    <LeftBarMenuSubs
                        className="leftbarmenu-subs"
                        ItemID="7"
                        active={activemenu}
                        text="ReactJS 강좌"
                        count="1"
                        onClick={handleLeftBar.setActive}/>
                    <LeftBarMenuSubs className="leftbarmenu-subs"
                        temID="8"
                        active={activemenu}
                        text="HTML5 강좌"
                        count="12"
                        onClick={handleLeftBar.setActive}
                    />
                </LeftBar>
                <MyComponent>
                    <MyHeader>
                        <MyThumbnail thumbnail={profile.get('thumbnail')}>
                        </MyThumbnail>
                        <MyMenuBar onWrite={handleMyHeader.onWrite}>
                            {profile.get("username")}
                        </MyMenuBar>
                    </MyHeader>
                    <MyContent>
                        <Post>
                            <PostHeader username={profile.get("username")}/>
                            <PostContent/>
                            <PostFooter/>
                        </Post>
                        <Post>
                            <PostHeader username={profile.get("username")}/>
                            <PostContent/>
                            <PostFooter/>
                        </Post>
                        <Post>
                            <PostHeader username={profile.get("username")}/>
                            <PostContent/>
                            <PostFooter/>
                        </Post>
                        <Post>
                            <PostHeader username={profile.get("username")}/>
                            <PostContent/>
                            <PostFooter/>
                        </Post>
                        <Post>
                            <PostHeader username={profile.get("username")}/>
                            <PostContent/>
                            <PostFooter/>
                        </Post>
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
            header: state.base.header,
            leftbarmenu: state.base.leftbarmenu,
            user: state.base.user
        }
    }),
    dispatch => ({
        LeftbarMenuActions: bindActionCreators(leftbarmenuActions, dispatch)
    })
)(MyPage));