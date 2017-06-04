import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {
    MainPage,
    RegisterPage,
    CallbackPage,
    MyPage
} from './Routes';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={MainPage}/>
                <Route path="/callback" component={CallbackPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/mypage" component={MyPage}/>
            </div>
        );
    }
}

export default Routes;