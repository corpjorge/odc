import React from 'react';
import PropTypes from 'prop-types';

function Prerequisites(props) {

	const style = {
		width: '25%'
	}
	return (
		<div>
			<div className="table-responsive-sm">
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col" style={style}>Prerrequisito</th>
							<th scope="col">Descripción</th>
						</tr>
					</thead>
					<tbody>
						{
							props.data.map((p) => {
								return <tr key={p.code + p.descr}>
									<th scope="row" >{p.code}</th>
									<td>{p.descr}</td>
								</tr>
							})
						}
					</tbody>
				</table>
		
				<div className="alert alert-warning">Si un curso A tiene como prerrequisito un curso B*. El (*) quiere decir que el curso B tiene que tomarse simultáneamente 
					con el curso A o haberse aprobado previamente.</div>
				
			</div>
		</div>
	)
}

Prerequisites.propTypes = {
	course: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	class: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
}

export default Prerequisites;