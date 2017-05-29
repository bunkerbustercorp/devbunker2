import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './App';

class Root extends Component {
    render() {
        const {store} = this.props;
        return (
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object
}

// export default Root;
export default Root;