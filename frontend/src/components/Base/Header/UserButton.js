import React from 'react';
import defaultThumbnail from 'static/images/default-thumbnail.png';

const UserButton = ({thumbnail, onClick, children}) => {
    return (
        <div className="userbutton-wrapper">
            <div className="userbutton" onClick={onClick}>
                <div className="userbutton-thumbnail"
                    style={{backgroundImage: `url(${!thumbnail?defaultThumbnail:thumbnail})`}}>
                </div>
                <div className="userbutton-name">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserButton;