import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router'

class test extends Component {
    search() {
        console.log('a');
        this.context.router.history.push('/api/auth/check-username/test')
    }  
    render() {
        const {search} = this;
        return (
            <div>
                <Button onClick={search}>test</Button>
            </div>
        );
    }
}

export default withRouter(test);