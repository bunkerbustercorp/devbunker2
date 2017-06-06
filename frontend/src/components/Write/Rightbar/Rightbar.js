import React, {Component} from 'react';

class Rightbar extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.tags !== this.props.tags
            || nextProps.category !== this.props.category;
    }

    render() {
        const { children } = this.props;
        return (
            <div className="rightbar-wrapper">
                {children}
            </div>
        );
    }
};

export default Rightbar;