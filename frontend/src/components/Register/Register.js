import React from 'react';


const Register = ({ children }) => {
    return (
        <div className="register">
            <div className="registerinner">
                {children}
            </div>
        </div>
    );
};

export default Register;