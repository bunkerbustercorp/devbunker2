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

// load components
import { 
    Header,
    LeftbarButton,
    BrandLogo,
    AuthButton,
    UserButton,
    UserMenu
} from 'components/Base/Header';
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
        const { HeaderActions, UserActions } = this.props;
        return {
            open: () => {
                HeaderActions.openUserMenu();
            },
            onmypage: () => {
                this.props.history.push('/mypage');
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

    render() {
        const { status: { modal, user, header } } = this.props;
        const { handleAuth, handleModal, handleLinkAccount, handleUserMenu, handleLeftbar } = this;
        
        const profile = user.get('profile');
        return (
            <div>
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

                <Routes/>
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
            user: state.base.user
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch),
        ModalActions: bindActionCreators(modal, dispatch),
        UserActions: bindActionCreators(user, dispatch)
    })
)(App));