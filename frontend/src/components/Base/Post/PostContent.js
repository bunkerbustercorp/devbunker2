import React, { Component } from 'react';
import showdown from 'showdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import $ from 'jquery';

class PostContent extends Component {
    state = {
        html: ''
    }

    converter = null
    preview = null
    subdata = null

    componentDidMount() {
        const { content } = this.props;

        this.subdata = content.substring(0, 100) + (content.length<100 ? '' : " ...");

        this.converter = new showdown.Converter({
            simpleLineBreaks: true
        });

        const html = this.converter.makeHtml(this.subdata);

        this.setState({
            html
        });

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.content === this.props.content && nextProps.title === this.props.title) return;

        const { content } = nextProps;

        this.subdata = content.substring(0, 100) + (content.length<100 ? '' : " ...");
    
        const html = this.converter.makeHtml(this.subdata);
        
        this.setState({
            html
        });
    }    

    componentDidUpdate(prevProps, prevState) {
        if(this.state.html !== prevState.html) {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        }
    }

    createMarkup = () => ({
        __html: this.state.html
    });

    static defaultProps = {
        title: '',
        content: ''
    }

    render() {        
        const { createMarkup } = this;

        return (
            <div className="post-content">
                <div 
                    className="content" 
                    dangerouslySetInnerHTML={createMarkup()} 
                ></div>
            </div>
        );
    }
};

export default PostContent;