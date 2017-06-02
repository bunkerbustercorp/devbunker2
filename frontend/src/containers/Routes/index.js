import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {
    MainPage,
    RegisterPage,
    CallbackPage,
} from './Routes';

import test from './Pages/test';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={MainPage}/>
                <Route path="/callback" component={CallbackPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/test" component={test}/>
            </div>
        );
    }
}

export default Routes;