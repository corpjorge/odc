import React, {Component} from 'react';
import HomeLayout from '../components/homeLayout/homeLayout';
import PageContentLayout from '../components/layout/layout';
import SideBar from '../components/sideBar/sideBar';
import Footer from '../components/footer/footer';
import { CourseService } from '../services/courses';
import { AttributeService } from '../services/attributes';
import { CampusService } from '../services/campus';
import {TermService} from '../services/terms';
import {ProgramService} from '../services/programs';
import GridLoader from 'react-spinners/GridLoader';
import Alert from 'react-bootstrap/Alert';
import Course from '../components/course/course';
import Pagination from '../components/pagination/pagination';
import Recaptcha from 'react-recaptcha';

export default class Home extends Component{
    constructor(props){
		super(props);
		this.STEP_PAG=25;
        this.getCourses = this.getCourses.bind(this);
		this.getAttributes = this.getAttributes.bind(this);
        this.getAllCampus = this.getAllCampus.bind(this);
        this.setAttrInput = this.setAttrInput.bind(this);
		this.setGeneralInput = this.setGeneralInput.bind(this);
		this.setCampusInput = this.setCampusInput.bind(this);
		this.getAttrInputValues = this.getAttrInputValues.bind(this);
		this.getTerms=this.getTerms.bind(this);
		this.getPtrms=this.getPtrms.bind(this);
		this.getPrograms=this.getPrograms.bind(this);
		this.findCourses = this.findCourses.bind(this);
		this.setTermInput=this.setTermInput.bind(this);
		this.setPtrmInput=this.setPtrmInput.bind(this);
		this.onChangePtrm=this.onChangePtrm.bind(this);
		this.onChangeTerm=this.onChangeTerm.bind(this);
		this.setProgramsInput=this.setProgramsInput.bind(this);
		this.cleanForm=this.cleanForm.bind(this);
		this.setTimeIniInput=this.setTimeIniInput.bind(this);
		this.captchaok=this.captchaok.bind(this);
		this.verifyCallback=this.verifyCallback.bind(this);
		this.onChangePage=this.onChangePage.bind(this);
        this.state={
            error: {
				message: ''
			},
			courses: {
				records: []
			},
			attributes: {
				records: []
			},
			campus: {
				records: []
			},
			terms:{
				records:[]
			},
			ptrms:{
				records:[]
			},
			programs:{
				records:[]
			},
			filterParams:{
				termInput:'',
				ptrmInput:'',
				programsInput:'',
				campusInput:'',
				attrsInput:'',
				timeIniInput:'',
				generalInput:''
			},
			coursesLoading: false,
			captcha: false
        }
    }

    componentDidMount() {
		this.getCourses('', '', '',0,this.STEP_PAG);
		this.getAttributes();
		this.getAllCampus();
		this.getTerms();
	}
	
    
    getCourses(term, ptrm, prefix, offset, limit, currentAttr, attrsInput, campusInput, generalInput,timeIniInput) {
		this.setState({
			coursesLoading: true
		});
		CourseService.getCourses(term, ptrm, prefix, offset, limit, currentAttr,attrsInput, 
			campusInput, generalInput,timeIniInput)
			.then((data) => {
				if (data) {
					this.setState({
						courses: {
							records: data
						},
						coursesLoading: false
					});
				}
			})
			.catch((err) => {
				this.setState({
					coursesLoading: false,
					error: {
						message: 'Ocurrio un error al consultar cursos. Consulte a Admisiones y Registro'
					}
				})
				console.log({error:err});
			})
	}

	getTerms(){
		TermService.getTerms()
		.then((data) => {

			if (data) {
				this.setState({
					terms: {
						records: data
					}
				});
			}
		})
		.catch((err) => {
			console.log(`Ocurrio un error ${err}`);
		});	
	}

	getPtrms(term){
		TermService.getPtrms(term)
		.then((data) => {
			if (data) {
				this.setState({
					ptrms: {
						records: data
					}
				});
			}
		})
		.catch((err) => {
			console.log(`Ocurrio un error ${err}`);
		});	
	}

	getPrograms(term, ptrm){
		ProgramService.getPrograms(term, ptrm)
		.then((data) => {
			if (data) {
				this.setState({
					programs: {
						records:data
					}
				});
			}
		})
		.catch((err) => {
			console.log(`Ocurrio un error ${err}`);
		});	
	}

	getAttributes() {
		AttributeService.getAttributes()
			.then((data) => {
				
				if (data) {
					this.setState({
						attributes: {
							records: data
						}
					});
				}
			})
			.catch((err) => {
				console.log(`Ocurrio un error ${err}`);
			});
	}

	getAllCampus() {
		CampusService.getAllCampus()
			.then((data) => {
				if (data) {
					this.setState({
						campus: {
							records: data
						}
					});
				}
			})
			.catch((err) => {
				console.log(`Ocurrio un error ${err}`);
			});
	}
	setTermInput(target){
		this.termInput=target;
	}
	setPtrmInput(target){
		this.ptrmInput=target;
	}
	setProgramsInput(target){
		this.programsInput=target;
	}
    setCampusInput(target) {
		this.campusInput = target;
	}
	setAttrInput(target) {
		this.attrInput = target;
	}
	setGeneralInput(target) {
		this.generalInput = target;
	}
	setTimeIniInput(target) {
		this.timeIni = target;
	}
	getAttrInputValues() {
		const selectedValues = [];
		const selectedOptions = this.attrInput.selectedOptions;

		if (selectedOptions && selectedOptions.length > 0) {
			for (let option of selectedOptions) {
				selectedValues.push(option.value);
			}
		}

		return selectedValues.join();
	}

	onChangePage(id){
		const {termInput,ptrmInput,programsInput,attrsInput,campusInput,generalInput,timeIniInput}= this.state.filterParams;
		const limit=id*this.STEP_PAG;
		this.getCourses(termInput, ptrmInput, programsInput,limit-this.STEP_PAG, this.STEP_PAG, '', attrsInput, 
		campusInput, generalInput,timeIniInput);
	}

	onChangeTerm(evt){
		this.getPtrms(this.termInput.value);
	}

	onChangePtrm(evt){
		this.getPrograms(this.termInput.value,this.ptrmInput.value);
	}

	findCourses(evt) {
        evt.preventDefault();
		this.setState({
			courses: {
				records: []
			},
			coursesLoading: true
		});

		const termInput= this.termInput.value;
		const ptrmInput= this.ptrmInput.value;
		const programsInput= this.programsInput.value;
		const campusInput = this.campusInput.value;
		const attrsInput = this.getAttrInputValues();
		const timeIniInput=this.timeIni.value;
		const generalInput = this.generalInput.value.toUpperCase()
			.replace(/Á/gi, "A")
			.replace(/É/gi, "E")
			.replace(/Í/gi, "I")
			.replace(/Ó/gi, "O")
			.replace(/Ú/gi, "U");

		this.setState({//Guarda últimos parámetros de busqueda para la paginación
			filterParams:{
				termInput,
				ptrmInput,
				programsInput,
				campusInput,
				attrsInput,
				timeIniInput,
				generalInput
			}
		})

		this.getCourses(termInput, ptrmInput, programsInput, 0, this.STEP_PAG, '', attrsInput, 
		campusInput, generalInput,timeIniInput);

	}

	cleanForm(evt){
		evt.preventDefault();
		this.termInput.value="";
		this.ptrmInput.value="";
		this.programsInput.value="";
		this.campusInput.value="";
		this.attrInput.value="";
		this.generalInput.value="";
	}

	oferta()
	{
		return (
			<>
			    <HomeLayout>
					<SideBar attributes={this.state.attributes.records}
							 campus={this.state.campus.records}
							 terms={this.state.terms.records}
							 ptrms={this.state.ptrms.records}
							 programs={this.state.programs.records}
                             setAttrInput={this.setAttrInput}
                             setCampusInput={this.setCampusInput}
							 setGeneralInput={this.setGeneralInput}
							 setTermInput={this.setTermInput}
							 setPtrmInput={this.setPtrmInput}
							 setProgramsInput={this.setProgramsInput}
							 setTimeIniInput={this.setTimeIniInput}
							 onChangeTerm={this.onChangeTerm}
							 onChangePtrm={this.onChangePtrm}
                             findCourses={this.findCourses}
							 cleanForm={this.cleanForm}/>
                    <PageContentLayout>
                        <h1 >Oferta de Cursos Universidad de los Andes</h1>
						<Pagination onChangePage={this.onChangePage} 
							courseDone={(this.state.courses.records.length-this.STEP_PAG)<0}
							filterParams={this.state.filterParams}/>
                        {
                            this.state.coursesLoading &&
                            <GridLoader />
                        }
                        {
                            this.state.error.message!==''&&
                            <Alert variant="danger">
                                {this.state.error.message}
                            </Alert>
                        }
                        {
                            (this.state.courses.records.length <= 0 && !this.state.coursesLoading
                                && this.state.error.message === '') ?
                                <Alert variant="warning" >
                                    No se encontraron elementos. Por favor, intente de nuevo con otros criterios de busqueda.
                                </Alert>
                                :
                                this.state.courses.records.map((c,index) => {
                                    return   <Course headerData={c}
												attributes={this.state.attributes.records}
                                                key={c.nrc+index} />
                                          
                                })
						}
						
                    </PageContentLayout>
                </HomeLayout>
                <br/>
                <br/>
                <Footer/>
            </>
		)
	}

	solicitarcaptcha()
	{
		return(
			<>
				<HomeLayout>
					<div className="row">
					<div className="col-md-12">
					<nav class="navbar navbar-expand-lg nav-uniandes bg-light border-bottom">
		<a class="navbar-brand " rel="home" href="https://www.uniandes.edu.co" title="Universidad de los Andes">
				   <img class="logo logo-uniandes" src="https://registroapps.uniandes.edu.co/SisSalones/img/AyR_BN_W.png" />
				</a>
        

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#barranavegacion" aria-controls="barranavegacion" aria-expanded="false" aria-label="Ver-ocultar navegación">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse " id="barranavegacion">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            
			
            
          </ul>
        </div>
      </nav>
					</div>
					<br /><br />
					<div className="col-md-12">
						<h1>Oferta de cursos</h1>
					</div>
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<h3>¿Qué es la oferta de cursos?</h3>
						<p>
						¡Bienvenido! Aquí encontrará la información de la oferta de cursos para los periodos activos. 
						Esta información se actualiza cada <span className="text-danger"><b>5 minutos</b></span> y está <span className="text-danger"><b>sujeta a modificaciones</b></span>.
						Si desea consultar la oferta en tiempo real puede hacerlo directamente haciendo clic <a href="https://mibanner.uniandes.edu.co/StudentRegistrationSsb/ssb/registration/registration" taget="_blank">aquí</a>.
						</p>
					
						<b>Al ingresar declaro que he leido cuidadosamente y he entendido las condiciones presentadas al final de esta página.</b>
						
						<Recaptcha sitekey="6Lde8AgUAAAAADYyDZxq6JhI9_JwynJarzX8CoW2" render="explicit" hl="es" onloadCallback={this.captchaok} verifyCallback={this.verifyCallback}/>
						<br /><br />
						<h4><em>Términos y condiciones de uso</em></h4>
						<p className="text-secondary"><em>
						Todos los contenidos de este sitio se encuentran protegidos por las normas internacionales y 
						nacionales vigentes sobre propiedad Intelectual, por lo tanto su utilización parcial o total, 
						reproducción, comunicación pública, transformación, distribución, alquiler, préstamo público 
						e importación, total o parcial, en todo o en parte, en formato impreso o digital y en cualquier 
						formato conocido o por conocer, se encuentran prohibidos, y solo serán lícitos en la medida 
						en que se cuente con la autorización previa y expresa por escrito de la Universidad de los Andes.
						<br /><br />
						</em>
						</p>
					
					</div>
				</div>
				
				</HomeLayout>
				<br /><br />
				<Footer/>
			</>
		)
	}

    render(){
		if(this.state.captcha)
		{
			return this.oferta();
		}
		else{
			return this.solicitarcaptcha();
		}
       
        
	}
	
	captchaok()
	{
		
	}

	verifyCallback(response)
	{
		
		if(response)
		{
			this.setState({
				captcha: true
			});
			this.forceUpdate();
		}
	}
}