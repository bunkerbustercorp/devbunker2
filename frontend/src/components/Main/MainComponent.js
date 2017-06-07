import React from 'react';
import Content from '../Common/Content';

const MainComponent = ({children}) => {
    return (
        <Content>
            <div className="main">
                {children}
            </div>
        </Content>
    );
};

export default MainComponent;