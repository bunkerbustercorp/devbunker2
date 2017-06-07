import React from 'react';
import { PostHeader, PostContent, PostFooter } from './';

const Post = ({
                _id,
                userId,
                thisUserId,
                title,
                content,
                releaseDate,
                isTemp,
                thumbnail,
                username,
                visibleId,
                onVisible,
                onEdit,
                onDelete,
                onHide
            
        }) => {
    return (
        <div className="post">
            <PostHeader
                postId={_id}
                userId={userId}
                thisUserId={thisUserId}
                title={title}
                releaseDate={releaseDate}
                isTemp={isTemp} 
                username={username}
                thumbnail={thumbnail}
                visibleId={visibleId}
                onVisible={onVisible}
                onEdit={onEdit}
                onDelete={onDelete}
                onHide={onHide}
            />
            <PostContent content={content}/>
            <PostFooter/>
        </div>
    );
};

export default Post;