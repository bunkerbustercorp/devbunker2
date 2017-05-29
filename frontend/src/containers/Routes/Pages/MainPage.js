import React, {Component} from 'react';
import FeedContainer from 'components/Common/FeedContainer';

class MainPage extends Component {
    render() {
        return (
            <div className="main-page">
                <FeedContainer image="1"/>
                <FeedContainer image="2"/>
                <FeedContainer image="3"/>
                <FeedContainer image="4"/>
                <FeedContainer image="5"/>
            </div>
        );
    }
}

export default MainPage;