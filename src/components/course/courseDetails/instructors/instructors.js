import React from 'react';
import PropTypes from 'prop-types';


function InstructorList(props) {
	return (

		<div>
			<ul>
				{
					props.data.map((i) => {
						return <li key={i.name}>{i.name}</li>
					})
				}
			</ul>
		</div>
	)
}

InstructorList.propTypes = {
	data: PropTypes.array.isRequired
}

export default InstructorList;