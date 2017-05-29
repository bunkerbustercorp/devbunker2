import React from 'react';
import {Icon} from 'semantic-ui-react';

const AuthButton = (onClick) => {
    return (
        <div className="auth-button-wrapper">
            <div className="auth-button" onClick={onClick.onClick}>
                <Icon name="user" fitted/>로그인
            </div>
        </div>
    );
};

export default AuthButton;