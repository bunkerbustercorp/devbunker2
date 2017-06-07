import React, {Component} from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import $ from 'jquery';
import DatePrint from 'components/Common/DatePrint';


class WritePreview extends Component {

    static propTypes = {
        markdown: PropTypes.string,
        scrollPercentage: PropTypes.number,
        isLastLine: PropTypes.bool
    }

    state = {
        html: ''
    }

    converter = null
    writepreview = null


    componentDidMount() {
        const { markdown } = this.props;

        const converter = new showdown.Converter({
            simpleLineBreaks: true
        });
        this.converter = converter;

        const html = converter.makeHtml(markdown);

        this.setState({
            html
        });

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
    
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.markdown === this.props.markdown && nextProps.title === this.props.title) return;

        const { markdown } = nextProps;
        const html = this.converter.makeHtml(markdown);
        
        this.setState({
            html
        });
    }

    componentDidUpdate(prevProps, prevState) {

        const { writepreview } = this;

        if(prevProps.markdown !== this.props.markdown) {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });

            // 내용이 바뀌었는데 isLastLine 이 참! 이면 맨 아래로 드래그
            if(this.props.isLastLine) {
                writepreview.scrollTop = writepreview.scrollHeight;
                return;
            }
        }

        if(prevProps.scrollPercentage !== this.props.scrollPercentage) {
            const { scrollPercentage } = this.props;

            if(!(scrollPercentage >= 0 && scrollPercentage <= 1)) return;

            const offsetHeight = writepreview.offsetHeight;
            const scrollHeight = writepreview.scrollHeight;
            
            writepreview.scrollTop = scrollPercentage * (scrollHeight - offsetHeight);
            
            // scrollTop / ( scrollHeight - offsetHeight)
        }
    }
    
    createMarkup = () => ({
        __html: this.state.html
    });

    render() {
        const { createMarkup } = this;
        const { title } = this.props;

        return (
            <div className="writepreview-wrapper" >
                <div className="writepreview" ref={ref=>{this.writepreview=ref}}>
                    <div className="writepreview-title">{title}</div>
                    <div className="writepreview-date"><DatePrint/></div>
                    <div 
                        className="writepreview-md-preview" 
                        dangerouslySetInnerHTML={createMarkup()} 
                    ></div>
                </div>
            </div>
        );
    }
}

export default WritePreview;