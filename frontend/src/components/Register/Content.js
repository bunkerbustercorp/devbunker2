import React from 'react';

const Content = ({children}) => {
    return (
        <div className="register-content">
            <div className="register-greeting">
                환영합니다!
            </div>
            <div className="register-information">
                앞으로 DevBunker 에서 사용 할 아이디를 설정하세요
            </div>
            {children}
        </div>
    );
};

export default Content;