import React from 'react';
import { Icon } from 'semantic-ui-react';

const SocialLoginButton = ({type, onClick}) => {
    return (
        <div className={`social-login-button ${type}`} onClick={onClick}>
            <Icon size='large' name={type}/><b>{type}</b> 계정으로 시작하기
            {(type==="github" || type==="facebook") ? ' (개발 예정)' : ''}
        </div>
    );
};

export default SocialLoginButton;