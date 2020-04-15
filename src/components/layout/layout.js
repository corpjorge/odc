import React from 'react';
import Header from '../header/header';
import './layout.css';
export default function PageContentLayout(props){
    return (
        <div className="page-content-wrapper">
            <Header/>
                <div className="container-fluid">
                    {props.children}
                </div>
        </div>
    )
}