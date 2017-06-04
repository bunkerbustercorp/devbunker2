import React from 'react';

const MyHeader = ({children}) => {
    return (
        <div className="my-header-wrapper">
            <div className="my-header">
                {children}
            </div>
        </div>
    );
};

export default MyHeader;