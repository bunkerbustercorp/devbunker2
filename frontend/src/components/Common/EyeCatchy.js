import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';


class Content extends Component {
    
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount () {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if(e.keyCode === 27) {
            const { hide } = this.props;
            hide();
        }
    }
    
    render() {
        const { children } = this.props;
        return children;
    }
    handleClickOutside() {
        this.props.hide();
    }
}

Content = onClickOutside(Content);

class EyeCatchy extends Component {

    handleHide = () => {
        const { onHide } = this.props;
        onHide();
    }
    
    render() {
        const { children } = this.props;
        const { handleHide } = this;

        return (
            <Content  hide={handleHide} eventTypes={["click", "touchend"]}>
                {children}
            </Content>
        )
    }
}

EyeCatchy.PropTypes = {
    onHide: PropTypes.func
}

export default EyeCatchy;