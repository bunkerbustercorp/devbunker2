import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

const Loader = ({visible}) => {
    if(!visible) return null;
    return (
        <div className="register-loader">
            <SemanticLoader active inverted inline size="big"/>
        </div>
    );
};

export default Loader;