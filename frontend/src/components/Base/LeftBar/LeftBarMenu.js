import React from 'react';

const LeftBarMenuItem = ({ItemID, active, text, onClick}) => {
    let activeMenu = {};

    if(ItemID===active){
        activeMenu = {
            color: "white",
            background: "#1098ad"
        };
    }

    return (
    <div className="leftbarmenu-item" style={activeMenu} onClick={()=>onClick(ItemID)}>
        {text}
    </div>
    )
}

export default LeftBarMenuItem;