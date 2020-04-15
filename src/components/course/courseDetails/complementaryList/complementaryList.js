import React from 'react';
import PropTypes from 'prop-types';
import Complementary from '../complementary/complementary';

function ComplementaryList(props) {
	return (
		<div>
			<div className="alert alert-warning" role="alert">
				La Sección principal (Magistral) con NRC {props.nrc}, debe ser inscrita de forma simultánea con alguna de las siguientes secciones del curso complementario.
					</div>
			<ul>
				{
					props.data.map((c,index) => {
						return <li key={c.nrc} >
									<Complementary data={c}
									attributes={props.attributes}
									key={c.nrc} />
								</li>
					})
				}
			</ul>
		</div>
	)
}

ComplementaryList.propTypes = {
	nrc: PropTypes.string.isRequired,
	attributes: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired

}

export default ComplementaryList;