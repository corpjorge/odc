import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProgramFind(props) {


	const style = {
		marginTop: '24px',
		padding: '5px',
		bottom: '5px'
	}
	return (
		<div>
			<form id="formBuscar" >
				<Row>
					{/*<Col xs={9} md={7} mdoffset={1}>
						<TextInput setInput={props.setNameInput}
							label={'Buscar departamento'}
							helpText={'Busque por nombre (Ej ADMINISTRACION) o identificador (Ej. ADMI)'}

						/>
					</Col>
	*/}
					<Col xs={3} md={4}>
						<Button bsstyle="primary" bssize="small" onClick={props.findPrograms} style={style}>Buscar</Button>
					</Col>
				</Row>
			</form>
		</div>
	)
}

ProgramFind.propTypes = {
	setNameInput: PropTypes.func.isRequired,
	findPrograms: PropTypes.func.isRequired
}

export default ProgramFind;