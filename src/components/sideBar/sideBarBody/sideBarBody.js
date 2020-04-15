import React from 'react';
import PropTypes from 'prop-types';
import CoursesForm from './coursesFilterForm/courseFilterForm';
import './sideBarBody.css';
export default function SideBarBody(props){
    return (
        <div className="list-group list-group-flush">
            <CoursesForm 
                attributes={props.attributes}
                campus={props.campus}
                terms={props.terms}
                ptrms={props.ptrms}
                programs={props.programs}
                setAttrInput={props.setAttrInput}
                setCampusInput={props.setCampusInput}
                setGeneralInput={props.setGeneralInput}
                setTermInput={props.setTermInput}
                setPtrmInput={props.setPtrmInput}
                setProgramsInput={props.setProgramsInput}
                setTimeIniInput={props.setTimeIniInput}
                getTimeIni={props.getTimeIni}
                onChangeTerm={props.onChangeTerm}
                onChangePtrm={props.onChangePtrm}
                findCourses={props.findCourses}
                cleanForm={props.cleanForm}
            />
	    </div>
    )
}

SideBarBody.propTypes={
    campus: PropTypes.array,
	attributes: PropTypes.array,
	setAttrInput: PropTypes.func,
	setCampusInput: PropTypes.func,
    setGeneralInput: PropTypes.func.isRequired,
    setTermInput:PropTypes.func.isRequired,
    setPtrmInput:PropTypes.func.isRequired,
    setProgramsInput:PropTypes.func.isRequired,
    setTimeIniInput:PropTypes.func.isRequired,
    getTimeIni:PropTypes.func.isRequired,
    findCourses: PropTypes.func.isRequired,
    terms:PropTypes.array,
    ptrms:PropTypes.array,
    programs:PropTypes.array,
    onChangeTerm:PropTypes.func.isRequired,
    onChangePtrm:PropTypes.func.isRequired,
    cleanForm:PropTypes.func.isRequired
}