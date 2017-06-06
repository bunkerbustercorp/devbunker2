import React from 'react';
import { Icon } from 'semantic-ui-react';
import EyeCatchy from 'components/Common/EyeCatchy';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const UserMenu = ({username, visible, onMyPage, onWrite, onHide, onLogout}) => {
    return (
        <div>
        <ReactCSSTransitionGroup
            transitionName={{
                enter: 'slideDown',
                leave: 'slideUp'
            }}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
            {
                visible && (
                    <EyeCatchy onHide={onHide}>
                        <div className="usermenu-wrapper">
                            <div className="usermenu">
                                <div className="usermenu-item" onClick={onMyPage}>
                                    <div className="usermenu-name">
                                        <Icon name="user"/><span>내 포스트로 이동</span>
                                    </div>
                                </div>
                                <div className="usermenu-item" onClick={onWrite}>
                                    <div className="usermenu-name">
                                        <Icon name="write"/><span>새 포스트</span>
                                    </div>
                                </div>
                                <div className="usermenu-item">
                                    <div className="usermenu-name">
                                        <Icon name="setting"/><span>설정</span>
                                    </div>
                                </div>
                                <div className="usermenu-item">
                                    <div className="usermenu-name">
                                        <Icon name="help circle outline"/><span>고객센터</span>
                                    </div>
                                </div>
                                <div className="usermenu-item" onClick={onLogout}>
                                    <div className="usermenu-name">
                                        <Icon name="power"/><span>로그아웃</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </EyeCatchy>
                )
            }
        </ReactCSSTransitionGroup>
            
        </div>
    );
};

export default UserMenu;