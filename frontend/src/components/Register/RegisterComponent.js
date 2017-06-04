import React from 'react';
import Content from '../Common/Content';

const Register = ({ children }) => {
    return (
        <Content>
            <div className="register">
                <div className="register-inner">
                    {children}
                </div>
            </div>
        </Content>
    );
};

export default Register;