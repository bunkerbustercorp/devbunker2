import React from 'react';

const LeftBar = ({children, visible}) => {
    if(!visible) return null;
    return (
        <div className="leftbar-wrapper">
            {children}
        </div>
    );
};

export default LeftBar;