import React from 'react';
import { Icon } from 'semantic-ui-react';

const MyMenuBar = ({children, onWrite}) => {
    return (
        <div className="my-menubar-wrapper">
            <div className="my-menubar-username">
                {children}
            </div>
            <div className="my-menubar">
                <div className="my-menubar-menu">
                    포스트
                </div>
                <div className="my-menubar-menu">
                    카테고리
                </div>
                <div className="my-menubar-menu">
                    정보
                </div>
                <div className="my-menubar-menu">
                    구독
                </div>
                <div className="my-menubar-write" onClick={onWrite}>
                    <Icon name="write"/>글쓰기
                </div>
            </div>
        </div>
    );
};

export default MyMenuBar;