import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { MainPage } from './Pages';
import Container from 'components/Common/Container';

class Routes extends Component {
    render() {
        return (
            <Container>
                <Route exact path="/" component={MainPage}/>
            </Container>
        );
    }
}

export default Routes;