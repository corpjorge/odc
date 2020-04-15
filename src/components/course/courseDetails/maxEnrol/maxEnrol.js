import React from 'react';
import PropTypes from 'prop-types';

function CourseMaxEnrol(props) {
	return (

		<div className="table-responsive-sm">
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Programa</th>
						<th scope="col">Capacidad</th>
						<th scope="col">Inscritos</th>
						<th scope="col">Disponibles</th>
					</tr>
				</thead>
				<tbody>
					{props.programsMaxEnrol.map((l) => {
						return <tr key={l.nrc + l.program}>
								<td><b>{l.program}</b></td>
								<td>{l.maxEnrol}</td>
								<td>{l.enrolled}</td>
								<td>{l.seatsAvail}</td>
							  </tr>
					})}
					<tr>
						<td><b>Total</b></td>
						<td>{props.maxEnrol}</td>
						<td>{props.enrolled}</td>
						<td>{props.seatsAvail}</td>
					</tr>
				</tbody>
			</table>
		</div>

	)
}

CourseMaxEnrol.propTypes = {
	programsMaxEnrol: PropTypes.array.isRequired,
	maxEnrol: PropTypes.string.isRequired,
	enrolled: PropTypes.string.isRequired,
	seatsAvail: PropTypes.string.isRequired
}

export default CourseMaxEnrol;