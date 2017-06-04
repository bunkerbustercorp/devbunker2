import React from 'react';
import defaultThumbnail from 'static/images/default-thumbnail.png';

const MyThumbnail = ({thumbnail}) => {
    return (
        <div className="my-thumbnail-wrapper">
            <div className="my-thumbnail"
                style={{backgroundImage: `url(${!thumbnail?defaultThumbnail:thumbnail})`}}>
            </div>
        </div>
    );
};

export default MyThumbnail;