import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';


const WriteToggler = ({current, onClick}) => {
    return (
        <div className="writetoggler-wrapper" onClick={
            () => onClick(!current)
        }>
            <div className={`writetoggler ${current?'left':''}`}>
                <Icon name="chevron right" fitted/>
            </div>
        </div>
    );
};

WriteToggler.propTypes = {
    current: PropTypes.bool,
    onClick: PropTypes.func
}

export default WriteToggler;