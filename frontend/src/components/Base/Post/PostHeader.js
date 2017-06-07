import React from 'react';
import { Icon } from 'semantic-ui-react';
import defaultThumbnail from 'static/images/default-thumbnail.png';
import PostOption from './PostOption';

const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}

const PostHeader = ({
                        postId,
                        userId,
                        thisUserId,
                        title,
                        releaseDate,
                        isTemp,
                        username,
                        thumbnail,
                        visibleId,
                        onVisible,
                        onEdit,
                        onDelete,
                        onHide
                    }) => {
    return (
        <div className="post-header">
            <div className="post-header-thumbnail"
                style={{backgroundImage: `url(${!thumbnail?defaultThumbnail:thumbnail})`}}>
            </div>

            <div className="post-header-up">
                <div className="post-header-title"> {title} </div>
                {userId===thisUserId ?
                    <div className="post-header-option" onClick={()=>onVisible(postId)}>
                        <Icon name="chevron down"/>
                        <PostOption
                            postId={postId}
                            visibleId={visibleId}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onHide={onHide}
                        />
                    </div>
                 : null}
            </div>

            <div className="post-header-down">
                <div className="post-header-username"> {username} </div>
                
                <div className="post-header-time">- &nbsp;&nbsp;{formatDate(releaseDate)}</div>
            </div>
        </div>
    );
};

export default PostHeader;