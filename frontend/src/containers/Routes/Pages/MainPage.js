import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router'

import * as sidebarmenu from 'redux/modules/base/sidebarmenu';

import Container from 'components/Common/Container';
import FeedContainer from 'components/Common/FeedContainer';
import { Sidebar, SidebarMenu, SidebarMenuSubs } from 'components/Base/Sidebar';
import { Main } from 'components/Main';

class MainPage extends Component {
    handleMenu = (() => {
        const { SidebarMenuActions } = this.props;
        return {
            setActive: (activeMenu) => {
                SidebarMenuActions.activeMenu(activeMenu);
            }
        }
    })()

    render() {
        const { status: { header, sidebarmenu } } = this.props;
        const { handleMenu } = this;

        const activemenu = sidebarmenu.get('activemenu');

        return (
            <Container className="mainPage">
                <Sidebar visible={header.get('sidebar')}>
                    <SidebarMenu 
                        ItemID="1"
                        active={activemenu}
                        text="BunkerBuster"
                        onClick={handleMenu.setActive}
                    />
                    <SidebarMenu
                        ItemID="2"
                        active={activemenu}
                        text="뉴스피드"
                        onClick={handleMenu.setActive}
                    />
                    <SidebarMenu ItemID="3"
                        active={activemenu}
                        text="인기"
                        onClick={handleMenu.setActive}
                    />
                    <SidebarMenu
                        ItemID="4"
                        active={activemenu}
                        text="카테고리"
                        onClick={handleMenu.setActive}
                    />
                    <SidebarMenuSubs className="menu_header"
                        ItemID="5"
                        active={activemenu}
                        text="구독"
                        onClick={handleMenu.setActive}
                    />
                    <SidebarMenuSubs
                        className="menu_subs"
                        ItemID="6"
                        active={activemenu}
                        text="JSP 강좌" 
                        count="5" 
                        onClick={handleMenu.setActive}/>
                    <SidebarMenuSubs
                        className="menu_subs"
                        ItemID="7"
                        active={activemenu}
                        text="ReactJS 강좌"
                        count="1"
                        onClick={handleMenu.setActive}/>
                    <SidebarMenuSubs className="menu_subs"
                        temID="8"
                        active={activemenu}
                        text="HTML5 강좌"
                        count="12"
                        onClick={handleMenu.setActive}
                    />
                </Sidebar>
                <Main>
                    <FeedContainer image="1"/>
                    <FeedContainer image="2"/>
                    <FeedContainer image="3"/>
                    <FeedContainer image="4"/>
                    <FeedContainer image="5"/>
                    <FeedContainer image="1"/>
                    <FeedContainer image="2"/>
                    <FeedContainer image="3"/>
                    <FeedContainer image="4"/>
                    <FeedContainer image="5"/>
                </Main>
                
            </Container>
        );
    }
}

// export default App;
export default withRouter(connect(
    state => ({
        status: {
            header: state.base.header,
            sidebarmenu: state.base.sidebarmenu
        }
    }),
    dispatch => ({
        SidebarMenuActions: bindActionCreators(sidebarmenu, dispatch)
    })
)(MainPage));