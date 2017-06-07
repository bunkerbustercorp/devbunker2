import React from 'react';

const PreviewList = ({children}) => {
    return (
        <div className="preview-list-wrapper">
            <div className="preview-list">
                {children}
            </div>
        </div>
    );
}

export default PreviewList;