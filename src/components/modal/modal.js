import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


function CustomModal(props) {
	const style = {
		margin: '5px',
		padding: '5px'
	}
	return (
		<div>
			<Button
				bssize={props.size}
				onClick={props.handleOpen}
				style={style}
				variant={props.buttonVariant}
				bsstyle={props.style}
			>
				{props.title}
			</Button>
			<Modal show={props.show} onHide={props.handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.children}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.handleClose} >Cerrar</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
CustomModal.propTypes = {
	title: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleOpen: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	size: PropTypes.string.isRequired,
	style: PropTypes.string,
	buttonVariant:PropTypes.string
}
export default CustomModal;