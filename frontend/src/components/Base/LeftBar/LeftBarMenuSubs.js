import React from 'react';

const LeftBarMenuItem = ({className, ItemID, active, text, count, onClick}) => {
    let activeMenu = {};
    let activeCount = {};

    if(ItemID===active){
        activeMenu = {
            color: "white",
            background: "#1098ad"
        };
        activeCount = {
            color: "#1098ad",
            background: "white"
        }
    }

    return (
    <div className={className} style={activeMenu} onClick={()=>onClick(ItemID)}>
        {text}
        {count ? 
            <span className="leftbarmenu-count" style={activeCount}>
                {count}
            </span>
        : null}
    </div>
    )
}

export default LeftBarMenuItem;