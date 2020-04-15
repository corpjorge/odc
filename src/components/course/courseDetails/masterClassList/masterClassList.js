import React from 'react';
import PropTypes from 'prop-types';
import Complementary from '../complementary';
import Col from 'react-bootstrap/Col';

function MasterClassList(props) {
	return (
		<div>
			<Col xs={12}>
				La Sección complementaria con NRC {props.nrc},
				debe ser inscrita de forma simultánea con la sección principal (Magistral) con NRC:
        {
					props.data.map((c) => {
						return <Complementary data={c}
							attributes={props.attributes}
							key={c.nrc} />
					})
				}
			</Col>
		</div>
	)
}

MasterClassList.propTypes = {
	nrc: PropTypes.string.isRequired,
	attributes: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired

}

export default MasterClassList;