import React from 'react';
import PropTypes from 'prop-types';
import './schedule.css';

function ScheduleTable(props) {
	return (
		<div  className="table-responsive-sm">
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Días</th>
						<th scope="col">Horas</th>
						<th scope="col">Salón</th>
						<th scope="col">Fecha inicio</th>
						<th scope="col">Fecha fin</th>
						<th scope="col">Edificio</th>
					</tr>
				</thead>
				<tbody>
					{props.schedule.map((r, index) => {
						return <tr style={{backgroundColor: '#fff'}} key={r.classroom + r.time_ini + r.time_end + r.date_ini + r.date_fin + index}>
							<th scope="row">{r.l} {r.m} {r.i} {r.j} {r.v} {r.s} {r.d}</th>						
							<td>{r.time_ini}-{r.time_fin}</td>
							<td>{r.classroom}</td>
							<td>{r.date_ini.substr(0,10)}</td>
							<td>{r.date_fin.substr(0,10)}</td>
							<td>{r.building}</td>
						</tr>
					})}
				</tbody>
			</table>
		</div>
	)
}
ScheduleTable.propTypes = {
	schedule: PropTypes.array.isRequired
}
export default ScheduleTable;