import React from 'react';
import PropTypes from 'prop-types';


function Corequisites(props) {

	const style = {
		width: '25%'
	}
	return (
		<div>
			<div className="table-responsive-sm">
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col" style={style}>Código</th>
							<th scope="col">Nombre</th>
						</tr>
					</thead>
					<tbody>
						{
							props.data.map((p) => {
								return <tr>
									<th scope="row" >{p.subject + '-' + p.coursenumber}</th>
									<td>{p.title}</td>
									
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

Corequisites.propTypes={
	course:PropTypes.string.isRequired,
	title:PropTypes.string.isRequired,
	class:PropTypes.string.isRequired,
	data:PropTypes.array.isRequired
}

export default Corequisites;