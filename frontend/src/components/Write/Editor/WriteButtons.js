import React from 'react';

const WriteButtons = ({ onSave, onRelease, saving, releasing, isTemp, onSetNew }) => {
    return (
        <div className="writebuttons-wrapper">
            { isTemp ? (
                <div>
                    <div className="writebuttons" onClick={()=>onSave(true)}>임시저장</div>
                    <div className="writebuttons" onClick={()=>onSave(false)}>게시</div>
                </div>
            ) : (
                <div>
                    <div className="writebuttons" onClick={()=>onSetNew()}>새로쓰기</div>
                    <div className="writebuttons" onClick={()=>onSave(false)}>
                        업데이트
                    </div>
                </div>
            ) }
        </div>
    );
};

export default WriteButtons;