import React from 'react';
import { Icon } from 'semantic-ui-react';

const LeftbarButton = (onClick) => {
    return (
        <div className="leftbarbutton" onClick={onClick.onClick}>
            <Icon name="sidebar"/>
        </div>
    );
};

export default LeftbarButton;