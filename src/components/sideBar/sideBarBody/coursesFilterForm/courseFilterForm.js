import React from 'react';
import PropTypes from 'prop-types';
import './coursesForm.css';
export default function CourseForm(props) {
	return (
		<form onSubmit={props.findCourses}>
			<div className="oculto">
				<label className="label-uniandes">Ver favoritas: </label>
				<br/>
			    <label className="switch">
				  <input type="checkbox"/>
				  <span className="slider round"></span>
				</label>
			</div>	
			<div className="form-group">
				<label className="label-uniandes" htmlFor="periodo">Periodo: </label>
				<select className="form-control form-control-sm" id="periodo" ref={props.setTermInput} onChange={props.onChangeTerm}>
					<option value="" defaultValue>Todos</option>
					{props.terms.map(function (t, index) {
						return <option value={t.term_desc} key={t.term_desc + index}>{t.term_desc} ({t.term_name})</option>
					})}
				</select>
			</div>
			<div className="form-group">
				<label className="label-uniandes" htmlFor="parte">Parte de Periodo: </label>
				<select className="form-control form-control-sm" id="parte" ref={props.setPtrmInput} onChange={props.onChangePtrm}>
					<option value="" defaultValue>Todas</option>
					{props.ptrms.map(function (t, index) {
						return <option value={t.ptrm} key={t.ptrm + index}>{t.ptrm} - {t.ptrm_name}</option>
					})}
				</select>
			</div>
			<div className="form-group">
				<label className="label-uniandes" htmlFor="programa">Departamento-Materia: </label>
				<select className="form-control form-control-sm" id="programa" ref={props.setProgramsInput}>
					<option value="" defaultValue>Todos</option>
					{props.programs.map(function (p, index) {
						return <option value={p.prefix} key={p.prefix + index}>{p.prefix} - {p.name}</option>
					})}
				</select>
			</div>
			<div className="form-group">
				<label className="label-uniandes" htmlFor="nrc">NRC, Código o Nombre: </label>
				<input type="examen" className="form-control form-control-sm" id="nrc" ref={props.setGeneralInput} />
			</div>
			<div className="form-group">
				<label className="label-uniandes" htmlFor="campus">Campus: </label>
				<select className="form-control form-control-sm" id="campus" ref={props.setCampusInput}>
					<option value="" defaultValue>Todos</option>
					{props.campus.map(function (c) {
						return <option value={c.code} key={c.code}>{c.name}</option>
					})}
				</select>
			</div>
			<div className="form-group">
				<label className="label-uniandes" htmlFor="atributo[]">Atributo: </label>
				<select multiple className="form-control form-control-sm" id="atributo[]" ref={props.setAttrInput}>
					<option value="" defaultValue>Seleccione</option>
					{props.attributes.map(function (a) {
						return <option value={a.code} key={a.code}>{a.name}</option>
					})}
				</select>
			</div>
			<div className="form-group">
				<label className="label-uniandes" htmlFor="hini">Hora Inicio: </label>
				<select className="form-control form-control-sm" id="hini" ref={props.setTimeIniInput}>
					<option value="" >Todas</option>
					{
						props.getTimeIni().map(item=>{
							return <option value={item} key={item}>{item}</option>
						})
					}
				</select>
			</div>
			<br />
			<button type="submit" className="btn btn-success boton-small">Filtrar <i className="fas fa-search"></i></button>
			<button className="btn btn-primary boton-small" onClick={props.cleanForm}>Limpiar <i className="fas fa-broom"></i></button>
		</form>
	)
}
CourseForm.propTypes = {
	campus: PropTypes.array,
	attributes: PropTypes.array,
	terms: PropTypes.array,
	ptrms: PropTypes.array,
	programs: PropTypes.array,
	getTimeIni:PropTypes.func.isRequired,
	setAttrInput: PropTypes.func,
	setCampusInput: PropTypes.func,
	setGeneralInput: PropTypes.func.isRequired,
	setTermInput: PropTypes.func.isRequired,
	setPtrmInput: PropTypes.func.isRequired,
	setProgramsInput: PropTypes.func.isRequired,
	setTimeIniInput:PropTypes.func.isRequired,
	findCourses: PropTypes.func.isRequired,
	onChangeTerm:PropTypes.func.isRequired,
    onChangePtrm:PropTypes.func.isRequired,
	cleanForm:PropTypes.func.isRequired
}