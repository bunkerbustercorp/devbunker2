import React from 'react';
import { Icon } from 'semantic-ui-react';
import EyeCatchy from 'components/Common/EyeCatchy';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PostOption = ({ postId, visibleId, onEdit, onDelete, onHide}) => {
    return (
        <div>
        <ReactCSSTransitionGroup
            transitionName={{
                enter: 'slideDown',
                leave: 'slideUp'
            }}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
        {(visibleId===postId) ? 
                    <EyeCatchy onHide={onHide}>
                        <div className="postoption-wrapper">
                            <div className="postoption">
                                <div className="postoption-item" onClick={()=>onEdit(postId)}>
                                    <div className="postoption-name">
                                        <Icon name="edit"/><span>수정</span>
                                    </div>
                                </div>
                                <div className="postoption-item" onClick={()=>onDelete(postId)}>
                                    <div className="postoption-name">
                                        <Icon name="delete"/><span>삭제</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </EyeCatchy>
        : null}
        </ReactCSSTransitionGroup>
            
        </div>
    );
};

export default PostOption;