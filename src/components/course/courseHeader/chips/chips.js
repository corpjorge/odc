import React from 'react';
import PropTypes from 'prop-types';
import './chips.css';
function CourseChips(props){
	return (
		<div className="chips">
			{
				!props.maxEnrol&&
				// eslint-disable-next-line
				props.attributes.map((a)=>{
					const style={
						backgroundColor:a.css
					}
					if(a && a.css){
						return <span className="badge" style={style} key={a.name}>{a.name}</span>
					}
				})
			}
			{
				!props.attributes&&
				(props.seatsAvail>0&&props.maxEnrol>0)?
				<span className="badge badge-success">{props.seatsAvail}</span> 
			
				:(props.seatsAvail<=0&&props.maxEnrol>0)&&
				<span className="badge badge-danger">Sin cupo</span>
			
			}
		</div>
	)
}

CourseChips.propTypes={
	attributes:PropTypes.array,
	seatsAvail:PropTypes.string,
	maxEnrol:PropTypes.string,
}

export default CourseChips;