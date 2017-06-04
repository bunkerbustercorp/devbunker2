import React from 'react';

const MyContent = ({children}) => {
    return (
        <div className="my-content">
            {children}
        </div>
    );
};

export default MyContent;