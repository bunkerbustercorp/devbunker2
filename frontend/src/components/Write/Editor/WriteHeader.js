import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import WriteButtons from './WriteButtons';

class WriteHeader extends Component {

    constructor(props) {
        super(props);
        // this.handleChange = debounce(this.handleChange, 500);
        this.delayedChange = debounce(this.delayedChange, 100);
    }

    handleChange = (e) => {
        e.persist();
        this.delayedChange(e);
    }

    delayedChange = (e) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    }
    
    render() {
        const { handleChange } = this;
        const { onSave, isTemp } = this.props;

        return (
            <div className="writeheader-wrapper">
                <div className="writeheader-title">
                    <WriteButtons onSave={onSave} isTemp={isTemp}/>
                    <input type="text" placeholder="포스트 제목" onChange={handleChange}></input>
                </div>
                <div className="writeheader-toolbar">
                    {/*굵게 기울임 왼쪽정렬 가운데정렬 오른쪽정렬 리스트 링크 자바스크립트*/}
                </div>
            </div>
        );
    }
}

export default WriteHeader;