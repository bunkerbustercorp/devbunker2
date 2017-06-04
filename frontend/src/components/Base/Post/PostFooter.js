import React from 'react';
import { Icon } from 'semantic-ui-react';

const PostFooter = () => {
    return (
        <div className="post-footer">
            <div className="post-footer-recommend">
                <Icon name="thumbs up"/>좋아요
            </div>
            <div className="post-footer-count">
                5
            </div>
            <div className="post-footer-comment">
                <Icon name="comment"/>댓글 달기
            </div>
        </div>
    );
};

export default PostFooter;