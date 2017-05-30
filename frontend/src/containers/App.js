import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import environment from 'environment';

// routes
import Routes from './Routes/Routes';

// redux
import * as header from 'redux/modules/base/header';
import * as modal from 'redux/modules/base/modal';
import * as user from 'redux/modules/base/user';
import * as sidebarmenu from 'redux/modules/base/sidebarmenu';

// load components
import Container from 'components/Common/Container';
import { Header, SidebarButton, BrandLogo, AuthButton, UserButton, UserMenu } from 'components/Base/Header';
import { LoginModal, SocialLoginButton } from 'components/Base/Modals/LoginModal';
import { LinkAccountModal } from 'components/Base/Modals/LinkAccountModal';
import { Sidebar, SidebarMenu, SidebarMenuSubs } from 'components/Base/Sidebar';

import storage from 'helpers/storage';
import axios from 'axios';

class App extends Component {

    componentWillMount() {
        const token = storage.get('token');
        const profile = storage.get('profile');

        const { UserActions } = this.props;

        if(token) {
            // axios 글로벌 설정
            axios.defaults.headers.common['x-access-token'] = token;
            // 스토어에 프로필 설정
            UserActions.setUserInfo(profile);
        }
    }

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
    
    handleLinkAccount = () => {
        const { status: { modal } } = this.props;
        const token = modal.getIn(['linkAccount', 'token']);

        // 스토리지에 연동용 토큰 저장
        storage.set('integrateToken', token);

        // 연동 할 계정으로 로그인 시도
        const provider = modal.getIn(['linkAccount', 'existingProvider']);
        this.handleAuth(provider);
    }

    handleUserMenu = (() => {
        const { HeaderActions, UserActions } = this.props;
        return {
            open: () => {
                HeaderActions.openUserMenu();
            },
            logout: () => {
                storage.remove('profile');
                storage.remove('token');
                UserActions.logout();
                this.context.router.push('/');
                HeaderActions.closeUserMenu();
            },
            close: () => {
                HeaderActions.closeUserMenu();
            }
        }
    })

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
        const { status: { modal, user, header, sidebarmenu } } = this.props;
        const { handleAuth, handleModal, handleLinkAccount, handleUserMenu, handleSidebar, handleMenu } = this;
        
        const activemenu = sidebarmenu.get('activemenu');
        const profile = user.get('profile');
        
        return (
            <div>
                <Header>
                    <SidebarButton onClick={header.get('sidebar') ? handleSidebar.hide : handleSidebar.show} />
                    <BrandLogo/>

                    {
                        profile.get('username')
                        ? <UserButton thumbnail={profile.get('thumbnail')} onClick={handleUserMenu.open}/>
                        : <AuthButton onClick={() => handleModal.open({modalName: 'login'})}/>
                    }

                    <UserMenu
                        username={profile.get('username')}
                        visible={header.getIn(['userMenu', 'open'])}
                        onHide={handleUserMenu.close}
                        onLogout={handleUserMenu.logout}/>
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

                    <LinkAccountModal 
                        visible={modal.getIn(['linkAccount', 'open'])} 
                        onHide={()=>handleModal.close('linkAccount')}
                        existingProvider={modal.getIn(['linkAccount', 'existingProvider'])}
                        provider={modal.getIn(['linkAccount', 'provider'])}
                        onLinkAccount={handleLinkAccount}
                        email={modal.getIn(['linkAccount', 'email'])}
                    />

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
            header: state.base.header,
            modal: state.base.modal,
            user: state.base.user,
            sidebarmenu: state.base.sidebarmenu
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch),
        ModalActions: bindActionCreators(modal, dispatch),
        UserActions: bindActionCreators(user, dispatch),
        SidebarMenuActions: bindActionCreators(sidebarmenu, dispatch)
    })
)(App);