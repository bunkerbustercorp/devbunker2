import React from 'react';

const SidebarMenuItem = ({ItemID, active, text, onClick}) => {
    let activeMenu = {};

    if(ItemID===active){
        activeMenu = {
            color: "white",
            background: "#1098ad"
        };
    }

    return (
    <div className="menu_item" style={activeMenu} onClick={()=>onClick(ItemID)}>
        {text}
    </div>
    )
}

export default SidebarMenuItem;