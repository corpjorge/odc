import React from 'react';
import './homeLayout.css';
export default function HomeLayout(props){
    return (
        <div className="d-flex" id="wrapper">
            {props.children}
        </div>
    )
}