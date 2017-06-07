import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';
import WriteToggler from './WriteToggler';

import throttle from 'lodash/throttle';

class WriteEditor extends Component {
    
    static propTypes = {
        onChange: PropTypes.func,
        onSetFullscreen: PropTypes.func,
        onSetIsLastLine: PropTypes.func,
        value: PropTypes.string,
        fullscreen: PropTypes.bool
    }

    writeeditor = null
    lastEditedRow = -1

    constructor(props) {
        super(props);
        this.handleChange = throttle(this.handleChange, 200);
        this.handleSetScrollPercentage = throttle(this.handleSetScrollPercentage, 100);
    }

    componentDidMount() {
        this.initializeEditor();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.fullscreen !== this.props.fullscreen) {
            this.initializeEditor();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value === this.props.value) return;

        if(nextProps.value === '') {
            const { value } = nextProps;
            this.writeeditor.setValue(value);
        }
    }

    componentWillUnmount() {
        this.writeeditor.getSession().removeAllListeners('changeScrollTop');
    }

    initializeEditor = () => {
        const { value } = this.props;

        const writeeditor = ace.edit('writeeditor-ace');
        const session = writeeditor.getSession();

        window.writeeditor = writeeditor;
        window.session = session;

        session.setMode('ace/mode/markdown');
        session.setUseWrapMode(true);
        writeeditor.setTheme('ace/theme/monokai');
        writeeditor.$blockScrolling = Infinity;
        writeeditor.setShowPrintMargin(false);
        writeeditor.renderer.setShowGutter(false);
        writeeditor.setValue(value, 1);

        const sc = document.getElementsByClassName('ace_scrollbar-inner')[0];

        const { handleSetScrollPercentage } = this;

        // 스크롤 이벤트 리스너
        if(!this.writeeditor) {
            session.on('changeScrollTop', function(scroll){
                handleSetScrollPercentage();
            });
        }

        window.sc = sc;

        this.writeeditor = writeeditor;
    }

    handleChange = (value) => {
        const { onChange, onSetIsLastLine } = this.props;        
        onChange(this.writeeditor.getValue());
        this.handleSetScrollPercentage();

        // 수정된 라인을 감지하고 현재 줄이 마지막 줄인지 아닌지 확인
        const currentRow = this.writeeditor.getCursorPosition().row;
        if(currentRow === this.lastEditedRow) {
            return;
        } else {
            this.lastEditedRow = currentRow;
            const lastRow = this.writeeditor.getSession().getLength() - 1;
            onSetIsLastLine(currentRow === lastRow);
        }
    }

    handleSetScrollPercentage = () => {
        const { onSetScrollPercentage } = this.props;

        const scroll = document.getElementsByClassName('ace_scrollbar-inner')[0];

        const offsetHeight =  document.getElementsByClassName('ace_scrollbar-v')[0].offsetHeight;
        const height = scroll.scrollHeight;
        const top = this.writeeditor.getSession().getScrollTop();
        const percentage = top / (height - offsetHeight);

        onSetScrollPercentage(percentage);
    }
    
    render() {
        const { handleChange } = this;
        const { fullscreen, onSetFullscreen } = this.props;
        return (
            <div className="writeeditor-wrapper">
                <div className={`writeeditor ${fullscreen ? 'fullscreen':''}`} 
                     onKeyUp={handleChange}>
                    <div className="writeeditor-ace" id="writeeditor-ace">
                    </div>
                </div>
                <WriteToggler 
                    current={fullscreen} 
                    onClick={onSetFullscreen}
                />
            </div>
        );
    }
}

export default WriteEditor;