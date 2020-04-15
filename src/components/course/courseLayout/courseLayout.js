import React from 'react';
import './courseLayout.css';
export default function CourseLayout(props){
    return (
        <div className="card">
            {props.children}
        </div>
    )
}