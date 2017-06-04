import React from 'react';
import Content from '../Common/Content';

const MyComponent = ({children}) => {
    return (
        <Content>
            <div className="my">
                {children}
            </div>
        </Content>
    );
};

export default MyComponent;