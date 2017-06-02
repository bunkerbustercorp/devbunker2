import React from 'react';

const Main = ({children, routeName}) => {
    return (
        <div className="main">
            <div className="maininner">
                {children}
            </div>
        </div>
    );
};

export default Main;