import React from 'react';
import PropTypes from 'prop-types';
import CourseChips from './chips/chips';
import ScheduleTable from './schedule/schedule';
import './courseHeader.css';


export default function CourseHeader(props) {

    return (
        <div className="card-header">
            <table className="card-header-title">
                <tbody>
                    <tr>
                        <td>
                            <h6><b>{props.class}-{props.course} {props.title}</b></h6>
                        </td>
                        <td style={{ width: '10%' }}>
                            <button className="btn btn-primary boton-small" type="button" onClick={() => { props.refreshSeatsAvail(props.term, props.ptrm, props.nrc) }}>
                                <i className="fas fa-sync"></i>
                            </button>
                            <button id={`mas-${props.nrc}`} className="btn btn-primary boton-small" type="button"
                                aria-expanded="true" aria-controls="collapseOne" onClick={() => { props.changeDetailsOpen(`mas-${props.nrc}`) }}>
                                <i className="fas fa-plus-circle"></i>
                            </button>
                            &nbsp;
                                <button id="fav-12345" type="button" className="btn btn-dark boton-small oculto" data-toggle="modal"
                                data-target="#modalFavorito">
                                <i className="fas fa-star"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <div className="row">
                <div className="col-md-3">
                    <div>
                        <div className="chips-row">
                            <b><i className="fas fa-users"></i> Cupo:</b>
                            {
                                props.seatsAvailLoading ?
                                    <div >Cargando...</div>
                                    :
                                    <CourseChips
                                        seatsAvail={props.seatsavail}
                                        maxEnrol={props.maxenrol}
                                    />
                            }
                        </div>
                        {
                            props.courseAttributes.length>0&&
                            <div className="chips-row">
                                <b><i className="fas fa-list"></i> Atributos:</b>
                                <CourseChips
                                    attributes={props.courseAttributes}
                                />
                            </div>
                        }
                        <b><i className="fas fa-play"></i> NRC:</b> {props.nrc}
                        <br />
                        <b><i className="fas fa-play"></i> Sección:</b> {props.section}
                        <br />
                        <b><i className="fas fa-hourglass"></i> Créditos:</b> {props.credits}
                    </div>
                </div>
                <div className="col-md-3">
                    <p>
                        <b><i className="fas fa-calendar"></i> Periodo:</b> {props.term}
                        <br />
                        <b><i className="fas fa-calendar"></i> Parte de Periodo:</b> {props.ptrmdesc}
                        <br />
                        {
                            props.instructors.length > 0 &&
                            <span><b><i className="fas fa-user"></i> Instructor principal:</b> {props.principalInstructor}</span>
                        }
                        <br />
                        <b><i className="fas fa-building"></i> Campus:</b>{props.campus}
                    </p>
                </div>
                <div className="col-md-6">
                    <b><i className="fas fa-calendar"></i> Horario:</b>
                    <div className="alert alert-info" role="alert">
                        La letra "I" corresponde al miercoles
                        </div>
                    <div >
                        {
                            props.schedules.length > 0 &&
                            <ScheduleTable schedule={props.schedules} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

CourseHeader.propTypes = {
    class: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    seatsavail: PropTypes.string.isRequired,
    maxenrol: PropTypes.string.isRequired,
    attr: PropTypes.array.isRequired,
    section: PropTypes.string.isRequired,
    credits: PropTypes.string.isRequired,
    nrc: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    ptrm: PropTypes.string.isRequired,
    ptrmdesc: PropTypes.string.isRequired,
    instructors: PropTypes.array.isRequired,
    campus: PropTypes.string.isRequired,
    schedules: PropTypes.array,
    enrolled: PropTypes.string.isRequired,
    seatsAvailLoading: PropTypes.bool.isRequired,
    changeDetailsOpen: PropTypes.func.isRequired,
    refreshSeatsAvail: PropTypes.func.isRequired,
    courseAttributes: PropTypes.array
}