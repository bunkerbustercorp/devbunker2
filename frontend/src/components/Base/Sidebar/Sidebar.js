import React from 'react';

const Sidebar = ({children, visible}) => {
    if(!visible) return null;
    return (
        <div>
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <div className="sidebar-menu">
                        {children}
                    </div>
                </div>
            </div>
            <div className="sidebar-spacer">
            </div>
        </div>
    );
};

export default Sidebar;