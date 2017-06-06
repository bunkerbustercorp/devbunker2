import React from 'react';
import { Icon } from 'semantic-ui-react';
import defaultThumbnail from 'static/images/default-thumbnail.png';

const PostHeader = ({username, thumbnail}) => {
    return (
        <div className="post-header">
            <div className="post-header-thumbnail"
                style={{backgroundImage: `url(${!thumbnail?defaultThumbnail:thumbnail})`}}>
            </div>

            <div className="post-header-up">
                <div className="post-header-title"> 제목 </div>
                
                <div className="post-header-option">
                    <Icon name="chevron down"/>
                </div>
            </div>

            <div className="post-header-down">
                <div className="post-header-username"> {username} </div>

                <div className="post-header-time">- 2017년 06월 05일</div>
            </div>
        </div>
    );
};

export default PostHeader;