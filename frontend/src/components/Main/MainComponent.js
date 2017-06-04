import React from 'react';
import Content from '../Common/Content';

const MainComponent = ({children}) => {
    return (
        <Content>
            {children}
        </Content>
    );
};

export default MainComponent;