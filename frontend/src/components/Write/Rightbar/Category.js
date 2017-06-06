import React, { Component } from 'react';
import CategoryItem from './CategoryItem';

class Category extends Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.category !== this.props.category;
    }
    
    render() {
        const { category, onConfigure, onToggle } = this.props;

        const categoryList = category.map(
            (item, i) => {
                return (
                    <CategoryItem
                        key={item.get('id')}
                        id={item.get('id')}
                        name={item.get('name')}
                        depth={item.get('depth')}
                        onToggle={() => onToggle(i)}
                        checked={item.get('value')}
                    />
                )
            }
        );  

        return (
            <div className="category">
                <div className="edit" onClick={onConfigure}>[수정]</div>
                {categoryList}
            </div>
        ); 
    }
}

export default Category