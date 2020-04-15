import React from 'react';
import PropTypes from 'prop-types';
import CourseMaxEnrol from './maxEnrol/maxEnrol';
import InstructorList from './instructors/instructors';
import Prerequisites from './prerequisites/prerequisites';
import Restrictions from './restrictions/restrictions';
//import Corequisites from './corequisites';
import ComplementaryList from './complementaryList/complementaryList';
//import MasterClassList from './masterClassList';
import Collapse from 'react-bootstrap/Collapse';
import './courseDetails.css';
import Corequisites from './corequisites/corequisites';
export default function CourseDetails(props) {

    return (
        <Collapse in={props.detailsOpen}>
            <div className="card-body collapse" id="collapseOne" aria-labelledby="headingOne">
                <div className="row">
                    <div className="col-md-5">
                        <h6 className="label-uniandes"><b><i className="fas fa-users"></i> Cupos:</b></h6>
                        <CourseMaxEnrol maxEnrol={props.maxenrol}
                            enrolled={props.enrolled}
                            seatsAvail={props.seatsavail}
                            programsMaxEnrol={props.programsmaxenrol} />
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-5">
                        <h6 className="label-uniandes"><b><i className="fas fa-plus-circle"></i> Complementarias</b></h6>
                        {
                            (props.compl.length > 0 && !props.isComplementary) ?
                                <ComplementaryList
                                    data={props.compl}
                                    attributes={props.courseAttributes}
                                    nrc={props.nrc} />
                                :
                                <div className="alerta-vacio">
                                   <div className="alert alert-info" role="alert">No tiene complementarias</div>
                                </div>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <h6 className="label-uniandes"><b><i className="fas fa-user"></i> Instructores:</b></h6>
                        {
                            props.instructors.length > 0 ?
                                <InstructorList data={props.instructors} />
                                :
                                <div className="alerta-vacio">
                                   <div className="alert alert-info" role="alert">Aun no tiene profesores asignados</div>
                                </div>
                        }
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-5">
                        <h6 className="label-uniandes"><b><i className="fas fa-plus-circle"></i>Correquisitos</b></h6>
                        {
                            (props.coreq.length > 0 && !props.isComplementary) ?
                                
                                <Corequisites 
                                    course={props.course}
                                    title={props.title}
                                    class={props.class}
                                    data={props.coreq}
                                />
                                :
                                <div className="alerta-vacio">
                                   <div className="alert alert-info" role="alert">No tiene correquisitos</div>
                                </div>
                        }
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-5">
                        <h6 className="label-uniandes"><b><i className="fas fa-backward"></i> Prerrequisitos</b></h6>
                        {
                            (props.prereq.length > 0 && !props.isComplementary) ?
                                <Prerequisites
                                    course={props.course}
                                    title={props.title}
                                    class={props.class}
                                    data={props.prereq} />
                                :
                                <div className="alerta-vacio">
                                    <div className="alert alert-info" role="alert">No tiene prerrequisitos</div>
                                </div>
                        }
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-5">
                        <h6 className="label-uniandes"><b><i className="fas fa-times-circle"></i>Restricciones</b></h6>
                        {
                            (props.restr.length > 0 && !props.isComplementary) ?
                                <Restrictions
                                    course={props.course}
                                    title={props.title}
                                    class={props.class}
                                    data={props.restr} />
                                :
                                <div className="alerta-vacio">
                                    <div className="alert alert-info" role="alert">No tiene restricciones</div>
                                </div>
                        }
                    </div>
                </div>

                        
                {/*aca inica el comentario
                    (props.coreq.length > 0 && !props.isComplementary) &&
                    <Row>
                        <Corequisites
                            course={props.course}
                            title={props.title}
                            class={props.class}
                            data={props.coreq} />
                    </Row>
                }
                {
                    (props.master.length > 0 && !props.isComplementary) &&
                    <Row>
                        <MasterClassList
                            data={props.master}
                            attributes={props.courseAttributes}
                            nrc={props.nrc} />
                    </Row>
                /*acá termina el comentario*/}

            </div>
        </Collapse>
    )
}

CourseDetails.propTypes = {
    class: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    seatsavail: PropTypes.string.isRequired,
    maxenrol:PropTypes.string.isRequired,
    nrc: PropTypes.string.isRequired,
    instructors: PropTypes.array.isRequired,
    compl: PropTypes.array,
    master: PropTypes.array,
    enrolled: PropTypes.string.isRequired,
    prereq: PropTypes.array,
    restr: PropTypes.array,
    coreq: PropTypes.array,
    programsmaxenrol: PropTypes.array.isRequired,
    detailsOpen: PropTypes.bool.isRequired,
    courseAttributes: PropTypes.array,
    isComplementary: PropTypes.bool
}