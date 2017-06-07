import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import environment from 'environment';
import { withRouter } from 'react-router'

// routes
import Routes from './Routes';

// redux
import * as header from 'redux/modules/base/header';
import * as modal from 'redux/modules/base/modal';
import * as user from 'redux/modules/base/user';
import * as write from 'redux/modules/write';
import * as leftbarmenuActions from 'redux/modules/base/leftbarmenu';

// load components
import { 
    Header,
    LeftbarButton,
    BrandLogo,
    AuthButton,
    UserButton,
    UserMenu
} from 'components/Base/Header';
import { LeftBar, LeftBarMenu, LeftBarMenuSubs } from 'components/Base/LeftBar';
import { LoginModal, SocialLoginButton } from 'components/Base/Modals/LoginModal';
import { LinkAccountModal } from 'components/Base/Modals/LinkAccountModal';

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
        location.href = `${environment.backendUrl}/api/auth/login/${provider}`;
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
        const { HeaderActions, UserActions, WriteActions } = this.props;
        return {
            open: () => {
                HeaderActions.openUserMenu();
            },
            onWrite: () => {
                WriteActions.initPost();
                this.props.history.push('write');
                HeaderActions.closeUserMenu();
            },
            onmypage: () => {
                this.props.history.push('/my');
                HeaderActions.closeUserMenu();
            },
            logout: () => {
                storage.remove('profile');
                storage.remove('token');
                UserActions.logout();
                this.props.history.push('/');
                HeaderActions.closeUserMenu();
            },
            close: () => {
                HeaderActions.closeUserMenu();
            }
        }
    })()

    handleLeftbar = (() => {
        const { HeaderActions } = this.props;
        return {
            show: () => {
                HeaderActions.showLeftbar();
            },
            hide: () => {
                HeaderActions.hideLeftbar();
            }
        }
    })()

    handleMenu = (() => {
        const { LeftbarMenuActions } = this.props;
        return {
            setActive: (activeMenu) => {
                LeftbarMenuActions.activeMenu(activeMenu);
                switch(activeMenu){
                    case "1":
                        this.props.history.push('/my');
                        break;
                    case "2":
                        this.props.history.push('/');
                        break;
                    default:
                        this.props.history.push('/');
                        break;
                }
            }
        }
    })()

    render() {
        const { status: { modal, user, header, leftbarmenu } } = this.props;
        const { handleAuth, handleModal, handleLinkAccount, handleUserMenu, handleLeftbar, handleMenu } = this;

        const activemenu = leftbarmenu.get('activemenu');
        
        const profile = user.get('profile');
        return (
            <div className="app">
                <Header>
                    <LeftbarButton
                        onClick={header.get('leftbar')
                        ? handleLeftbar.hide
                        : handleLeftbar.show}
                    />
                    <BrandLogo/>

                    {
                        profile.get('username')
                            ? (
                                <UserButton 
                                    thumbnail={profile.get('thumbnail')}
                                    onClick={handleUserMenu.open}>
                                    {profile.get('username')}
                                </UserButton>
                            )
                        : <AuthButton onClick={() => handleModal.open({modalName: 'login'})}/>
                    }

                    <UserMenu
                        username={profile.get('username')}
                        visible={header.getIn(['userMenu', 'open'])}
                        onWrite={handleUserMenu.onWrite}
                        onMyPage={handleUserMenu.onmypage}
                        onHide={handleUserMenu.close}
                        onLogout={handleUserMenu.logout}/>
                </Header>

                <LoginModal
                    visible={modal.getIn(['login', 'open'])}
                    onClick={() => handleModal.close('login')}
                >
                        <SocialLoginButton onClick={() => handleAuth('github')} type="github"/>
                        <SocialLoginButton onClick={() => handleAuth('google')} type="google"/>
                        <SocialLoginButton onClick={() => handleAuth('facebook')} type="facebook"/>
                </LoginModal>
                <LinkAccountModal 
                    visible={modal.getIn(['linkAccount', 'open'])} 
                    onHide={()=>handleModal.close('linkAccount')}
                    existingProvider={modal.getIn(['linkAccount', 'existingProvider'])}
                    provider={modal.getIn(['linkAccount', 'provider'])}
                    onLinkAccount={handleLinkAccount}
                    email={modal.getIn(['linkAccount', 'email'])}
                />
                <div className="app-content">
                    <LeftBar visible={header.get('leftbar')}>
                        {profile.get('username') ? 
                            <LeftBarMenu 
                                ItemID="1"
                                active={activemenu}
                                text={profile.get('username')}
                                onClick={handleMenu.setActive}
                            />
                            : null
                        }
                        <LeftBarMenu
                            ItemID="2"
                            active={activemenu}
                            text="뉴스피드"
                            onClick={handleMenu.setActive}
                        />
                        <LeftBarMenu ItemID="3"
                            active={activemenu}
                            text="인기 (개발 예정)"
                            onClick={handleMenu.setActive}
                        />
                        <LeftBarMenu
                            ItemID="4"
                            active={activemenu}
                            text="카테고리 (개발 예정)"
                            onClick={handleMenu.setActive}
                        />
                        <LeftBarMenuSubs className="leftbarmenu-header"
                            ItemID="5"
                            active={activemenu}
                            text="구독 (개발 예정)"
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
                    <Routes className={header.get('leftbar') ? "leftbar" : ''}/>
                </div>
            </div>
        );
    }
}

// export default App;
export default withRouter(connect(
    state => ({
        status: {
            header: state.base.header,
            modal: state.base.modal,
            user: state.base.user,
            leftbarmenu: state.base.leftbarmenu
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch),
        ModalActions: bindActionCreators(modal, dispatch),
        UserActions: bindActionCreators(user, dispatch),
        WriteActions: bindActionCreators(write, dispatch),
        LeftbarMenuActions: bindActionCreators(leftbarmenuActions, dispatch)
    })
)(App));