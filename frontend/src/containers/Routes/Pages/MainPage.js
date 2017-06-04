import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

import * as leftbarmenuActions from 'redux/modules/base/leftbarmenu';

import Container from 'components/Common/Container';
import { Post } from 'components/Base/Post';
import { LeftBar, LeftBarMenu, LeftBarMenuSubs } from 'components/Base/LeftBar';
import { MainComponent } from 'components/Main';

class MainPage extends Component {
    handleMenu = (() => {
        const { LeftbarMenuActions } = this.props;
        return {
            setActive: (activeMenu) => {
                LeftbarMenuActions.activeMenu(activeMenu);
            }
        }
    })()

    render() {
        const { status: { header, leftbarmenu } } = this.props;
        const { handleMenu } = this;

        const activemenu = leftbarmenu.get('activemenu');

        return (
            <Container>
                <LeftBar visible={header.get('leftbar')}>
                    <LeftBarMenu 
                        ItemID="1"
                        active={activemenu}
                        text="BunkerBuster"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenu
                        ItemID="2"
                        active={activemenu}
                        text="뉴스피드"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenu ItemID="3"
                        active={activemenu}
                        text="인기"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenu
                        ItemID="4"
                        active={activemenu}
                        text="카테고리"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenuSubs className="leftbarmenu-header"
                        ItemID="5"
                        active={activemenu}
                        text="구독"
                        onClick={handleMenu.setActive}
                    />
                    <LeftBarMenuSubs
                        className="leftbarmenu-subs"
                        ItemID="6"
                        active={activemenu}
                        text="JSP 강좌" 
                        count="5" 
                        onClick={handleMenu.setActive}/>
                    <LeftBarMenuSubs
                        className="leftbarmenu-subs"
                        ItemID="7"
                        active={activemenu}
                        text="ReactJS 강좌"
                        count="1"
                        onClick={handleMenu.setActive}/>
                    <LeftBarMenuSubs className="leftbarmenu-subs"
                        temID="8"
                        active={activemenu}
                        text="HTML5 강좌"
                        count="12"
                        onClick={handleMenu.setActive}
                    />
                </LeftBar>
                <MainComponent>
                    <Post image="1"/>
                    <Post image="2"/>
                    <Post image="3"/>
                    <Post image="4"/>
                    <Post image="5"/>
                    <Post image="1"/>
                    <Post image="2"/>
                    <Post image="3"/>
                    <Post image="4"/>
                    <Post image="5"/>
                </MainComponent>
            </Container>
        );
    }
}

// export default App;
export default withRouter(connect(
    state => ({
        status: {
            header: state.base.header,
            leftbarmenu: state.base.leftbarmenu
        }
    }),
    dispatch => ({
        LeftbarMenuActions: bindActionCreators(leftbarmenuActions, dispatch)
    })
)(MainPage));