import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router} from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { client } from 'redux/configureStore';

import App from './App';

class Root extends Component {
    render() {
        const {store} = this.props;
        return (
            <ApolloProvider store={store} client={client}>
                <Router>
                    <App history={this.props.history}/>
                </Router>
            </ApolloProvider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object
}

// export default Root;
export default Root;