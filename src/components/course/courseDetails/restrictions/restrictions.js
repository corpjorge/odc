import React from 'react';
import PropTypes from 'prop-types';



function Restrictions(props) {

	function showDesc(desc) {
		if (desc.length > 1) {
			return desc.join()
		} else {
			return desc[0]
		}
	}

	const style={
		width:'15%'
	}
	return (
		<div>
			<div className="table-responsive-sm">
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col" style={style}>Tipo</th>
							<th scope="col" style={style}>Indicador</th>
							<th scope="col">Descripción</th>
						</tr>
					</thead>
					<tbody>
						{
							props.data.map((r) => {
								return <tr key={r.type + r.ind}>
									<th scope="row">{r.type}</th>
									<td>{r.ind}</td>
									<td>{showDesc(r.desc)}</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	)

}

Restrictions.propTypes = {
	course: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	class: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
}

export default Restrictions;