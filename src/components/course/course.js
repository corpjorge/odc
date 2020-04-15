import React, { Component } from 'react';
import CourseDetails from './courseDetails/courseDetails';
import { CourseService } from '../../services/courses';
import Alert from 'react-bootstrap/Alert';
import CourseHeader from './courseHeader/courseHeader';
import PropTypes from 'prop-types';
import CourseLayout from './courseLayout/courseLayout';

class Course extends Component {

	constructor(props) {
		super(props);

		this.findPrincipalIns = this.findPrincipalIns.bind(this);
		this.drawChipsAttr = this.drawChipsAttr.bind(this);
		this.changeDetailsOpen = this.changeDetailsOpen.bind(this);
		this.changeSign=this.changeSign.bind(this);
		this.refreshSeatsAvail=this.refreshSeatsAvail.bind(this);
		this.state = {
			detailsOpen: false,
			tooltipOpen: false,
			courseAttributes: [],
			seatsAvail:this.props.headerData.seatsavail,
			seatsAvailLoading:false,
			detailsLoading: false,
			error: {
				message: ''
			},
			details: null
		}
	}

	componentDidMount() {
		this.drawChipsAttr();
	}

	findPrincipalIns(instructors) {
		let result = instructors[0]
		if (instructors.length > 1) {
			result = instructors.find(function (i) {
				return i.ind === 'Y'
			})
		} else {
			result = instructors[0]
		}
		if (result) {
			return result.name
		}
	}

	drawChipsAttr() {
		const courseAttributes = [];
		for (let item of this.props.headerData.attr) {
			let result = this.props.attributes.find(function (a) {
				return a.code === item.code
			})
			if (result) {
				courseAttributes.push(result);
			}
		}
		this.setState({
			courseAttributes
		})
	}

	refreshSeatsAvail(term, ptrm, nrc){
		this.setState({
			seatsAvailLoading:true
		})
		CourseService.getSeatsAvail(term, ptrm, nrc)
		.then(data=>{
			this.setState({
				seatsAvail:data.seatsavail,
				seatsAvailLoading:false
			})
		})
		.catch(error=>{
			console.log(`Ocurrio un error ${error}`);
			this.setState({
				seatsAvailLoading:false
			})
		})
	}

	changeSign(id)
	{
	
		const bt = document.getElementById(id);
		if(bt.innerHTML.includes('plus-circle'))
		{
			bt.innerHTML = '<i class="fas fa-minus-circle"></i>';
		}
		else
		{
			bt.innerHTML = '<i class="fas fa-plus-circle"></i>';
		}
	}

	changeDetailsOpen(id) {
		this.changeSign(id);
		if(!this.state.detailsOpen){
			this.setState({
				detailsLoading: true
			})
			CourseService.getCourseDetails(this.props.headerData.term,
				this.props.headerData.ptrm, this.props.headerData.nrc)
				.then((data) => {
					if (data) {
						this.setState({
							details: data,
							detailsLoading: false
						});
					}
				})
				.catch((error) => {
					this.setState({
						detailsLoading: false,
						error: {
							message: 'Ocurrio un error al consultar cursos. Consulte a Admisiones y Registro'
						}
					})
					console.log(`Ocurrio un error ${error}`);
				})
		}
		this.setState({
			detailsOpen: !this.state.detailsOpen
		})
	}

	shouldComponentUpdate(nextProps,nextState){
		return (nextState.details!==this.state.details 
				|| nextState.detailsOpen!==this.state.detailsOpen
				|| nextState.courseAttributes !== this.state.courseAttributes
				|| nextState.seatsAvailLoading !== this.state.seatsAvailLoading);
	}

	render() {
		const data=this.props.headerData;
		data.seatsavail=String(this.state.seatsAvail);
		return (
			<CourseLayout >
				<CourseHeader
					{...data}
					changeDetailsOpen={this.changeDetailsOpen}
					courseAttributes={this.state.courseAttributes}
					principalInstructor={this.findPrincipalIns(this.props.headerData.instructors)}
					refreshSeatsAvail={this.refreshSeatsAvail}
					seatsAvailLoading={this.state.seatsAvailLoading}
				/>
				{
					this.state.detailsLoading &&
					<span className="alert alert-info">Cargando...</span>
				}
				{
					this.state.error.message !== '' &&
					<Alert variant="danger">
						{this.state.error.message}
					</Alert>
				}
				{
					this.state.details&&
					<CourseDetails
						{...this.props.headerData}
						{...this.state.details}
						detailsOpen={this.state.detailsOpen}
						courseAttributes={this.state.courseAttributes}
						isComplementary={this.props.isComplementary}
					/>
				}
					
				
			</CourseLayout>
			
		)
	}
}

Course.propTypes = {
	headerData: PropTypes.object,
	attributes: PropTypes.array,
	isComplementary: PropTypes.bool
}

export default Course;