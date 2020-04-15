import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomModal from '../../../modal/modal';
import Course from '../../course';
import Col from 'react-bootstrap/Col';


class Complementary extends Component {

	constructor(props) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			show: false
		}
	}

	handleToggle() {
		this.setState({
			show: !this.state.show
		})
	}

	shouldComponentUpdate(nextProps,nextState){
		return nextState.show!==this.state.show;
	}

	render() {
		const title = `${this.props.data.nrc}-${this.props.data.title}`;
		return (
			<CustomModal
				title={title}
				show={this.state.show}
				handleClose={this.handleToggle}
				handleOpen={this.handleToggle}
				size={'sm'}
				buttonVariant={'link'}
			>
				<Col xs={12}>
					<Course
						headerData={this.props.data}
						attributes={this.props.attributes}
						isComplementary={true}
					/>
				</Col>
			</CustomModal>
		)
	}
}

Complementary.propTypes = {
	data: PropTypes.object.isRequired,
	attributes: PropTypes.array.isRequired

}

export default Complementary;