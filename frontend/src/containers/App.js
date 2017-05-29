import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import environment from 'environment';

// routes
import Routes from './Routes/Routes';

// redux
import * as modal from 'redux/modules/base/modal';
import * as header from 'redux/modules/base/header';
import * as sidebarmenu from 'redux/modules/base/sidebarmenu';

// load components
import Container from 'components/Common/Container';
import { LoginModal, SocialLoginButton } from 'components/Base/Modals';
import { Header, SidebarButton, BrandLogo, AuthButton } from 'components/Base/Header';
import { Sidebar, SidebarMenu, SidebarMenuSubs } from 'components/Base/Sidebar';

class App extends Component {
    handleAuth = (provider) => {
        // 주어진 provider 로그인 페이지로 이동
        location.href = `${environment.backendUrl}/api/auth/login/${provider}`
    }
    handleModal = (() => {
        const { ModalActions } = this.props;
        return {
            open: ({modalName, data}) => {
                ModalActions.openModal({modalName, data});
            },
            close: (modalName) => {
                ModalActions.closeModal(modalName);
            }
        }
    })()
    handleSidebar = (() => {
        const { HeaderActions } = this.props;
        return {
            show: () => {
                HeaderActions.showSidebar();
            },
            hide: () => {
                HeaderActions.hideSidebar();
            }
        }
    })()

    handleMenu = (() => {
        const { SidebarMenuActions } = this.props;
        return {
            setActive: (activeMenu) => {
                SidebarMenuActions.activeMenu(activeMenu);
            }
        }
    })()

    render() {
        const { status: { modal, header, sidebarmenu } } = this.props;
        const { handleAuth, handleModal, handleSidebar, handleMenu } = this;
        const activemenu = sidebarmenu.get('activemenu');
        return (
            <div>
                <Header>
                    <SidebarButton onClick={header.get('sidebar') ? handleSidebar.hide : handleSidebar.show} />
                    <BrandLogo/>
                    <AuthButton onClick={() => handleModal.open({modalName: 'login'})}/>
                </Header>
                <LoginModal visible={modal.getIn(['login', 'open'])} onClick={() => handleModal.close('login')}>
                    <SocialLoginButton onClick={() => handleAuth('github')} type="github"/>
                    <SocialLoginButton onClick={() => handleAuth('google')} type="google"/>
                    <SocialLoginButton onClick={() => handleAuth('facebook')} type="facebook"/>
                </LoginModal>
                <Container>
                    <Sidebar visible={header.get('sidebar')}>
                        <SidebarMenu ItemID="1" active={activemenu} text="BunkerBuster" onClick={handleMenu.setActive}/>
                        <SidebarMenu ItemID="2" active={activemenu} text="뉴스피드" onClick={handleMenu.setActive}/>
                        <SidebarMenu ItemID="3" active={activemenu} text="인기" onClick={handleMenu.setActive}/>
                        <SidebarMenu ItemID="4" active={activemenu} text="카테고리" onClick={handleMenu.setActive}/>
                        <SidebarMenuSubs className="menu_header" ItemID="5" active={activemenu} text="구독" onClick={handleMenu.setActive}/>
                        <SidebarMenuSubs className="menu_subs" ItemID="6" active={activemenu} text="JSP 강좌" count="5" onClick={handleMenu.setActive}/>
                        <SidebarMenuSubs className="menu_subs" ItemID="7" active={activemenu} text="ReactJS 강좌" count="1" onClick={handleMenu.setActive}/>
                        <SidebarMenuSubs className="menu_subs" ItemID="8" active={activemenu} text="HTML5 강좌" count="12" onClick={handleMenu.setActive}/>
                    </Sidebar>
                    <Routes/>
                </Container>
            </div>
        );
    }
}

// export default App;
export default connect(
    state => ({
        status: {
            modal: state.base.modal,
            header: state.base.header,
            sidebarmenu: state.base.sidebarmenu
        }
    }),
    dispatch => ({
        ModalActions: bindActionCreators(modal, dispatch),
        HeaderActions: bindActionCreators(header, dispatch),
        SidebarMenuActions: bindActionCreators(sidebarmenu, dispatch)
    })
)(App);