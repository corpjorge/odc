
import React from 'react';
import './sideBarLayout.css';

export default function SideBarLayout(props){
    return (
        <div className="bg-dark border-right" id="sidebar-wrapper" >
            {props.children}
        </div>
    )
}