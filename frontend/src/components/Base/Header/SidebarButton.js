import React from 'react';
import { Icon } from 'semantic-ui-react';

const SidebarButton = (onClick) => {
    return (
        <div className="sidebar-button" onClick={onClick.onClick}>
            <Icon name="sidebar"/>
        </div>
    );
};

export default SidebarButton;