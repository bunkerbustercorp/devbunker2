import React from 'react';

const Post = ({children}) => {
    return (
        <div className="post">
            {children}
        </div>
    );
};

export default Post;