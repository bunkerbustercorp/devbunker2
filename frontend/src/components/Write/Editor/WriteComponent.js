import React from 'react';
import PropTypes from 'prop-types';
import Content from '../../Common/Content';

import WriteHeader from './WriteHeader';
import WriteContent from './WriteContent';
import WriteEditor from './WriteEditor';
import WritePreview from './WritePreview';

const WriteComponent = ({
                            onChangeTitle,
                            onChangeMarkdown, 
                            onSetFullscreen,
                            onSetScrollPercentage,
                            onSetIsLastLine,
                            title, 
                            markdown, 
                            fullscreen,
                            scrollPercentage,
                            isLastLine,
                            onSave,
                            isTemp,
                            className,
                            onSetNew
                        }) => {
    return (
        <Content>
            <div className={`writecomponent ${className}`}>
                <WriteHeader
                    onChange={onChangeTitle}
                    onSave={onSave}
                    onSetNew={onSetNew}
                    isTemp={isTemp}
                    title={title}
                />
                <WriteContent>
                    <WriteEditor
                        onChange={onChangeMarkdown} 
                        onSetFullscreen={onSetFullscreen}
                        onSetScrollPercentage={onSetScrollPercentage}
                        onSetIsLastLine={onSetIsLastLine}
                        value={markdown} 
                        fullscreen={fullscreen}
                    />
                    <WritePreview 
                            title={title} 
                            markdown={markdown} 
                            scrollPercentage={scrollPercentage}
                            isLastLine={isLastLine}
                        />
                    </WriteContent>
            </div>
        </Content>
    );
};

WriteComponent.propTypes = {
    onChangeTitle: PropTypes.func,
    onChangeMarkdown: PropTypes.func,
    onSetFullscreen: PropTypes.func,
    onSetScrollPercentage: PropTypes.func,
    onSetIsLastLine: PropTypes.func,
    title: PropTypes.string,
    markdown: PropTypes.string,
    fullscreen: PropTypes.bool,
    scrollPercentage: PropTypes.number,
    isLastLine: PropTypes.bool,
    onSave: PropTypes.func,
    isTemp: PropTypes.bool

}

export default WriteComponent;