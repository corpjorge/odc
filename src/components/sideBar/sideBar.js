import React,{Component} from 'react';
import SideBarLayout from './sideBarLayout/sideBarLayout';
import SideBarHeader from './sideBarHeader/sideBarHeader';
import SideBarBody from './sideBarBody/sideBarBody';
import PropTypes from 'prop-types';
export default class SideBar extends Component {
    constructor(props){
        super(props);
        this.getTimeIni=this.getTimeIni.bind(this);
    }
    getTimeIni(){
        const timeIniArray=[];
        let hourIni="6";
        let minIni="30";
        do{
            timeIniArray.push(`${Number(hourIni)<10?'0'+hourIni:hourIni}${minIni}`);
            minIni= minIni==="30"?"00":"30";
            hourIni= minIni==="00"?`${Number(hourIni)+1}`:hourIni;
        }while(hourIni!=="21" || minIni!=="00")

        return timeIniArray;

    }
    shouldComponentUpdate(nextProps,nextState){
        return (nextProps.terms!==this.props.terms || nextProps.campus!==this.props.campus 
                || nextProps.ptrms!==this.props.ptrms || nextProps.programs!==this.props.programs 
                || nextProps.attributes!==this.props.attributes)
    }
    render(){
        return (
            <SideBarLayout>
                <SideBarHeader />
                <SideBarBody
                    attributes={this.props.attributes}
                    campus={this.props.campus}
                    terms={this.props.terms}
                    ptrms={this.props.ptrms}
                    programs={this.props.programs}
                    setAttrInput={this.props.setAttrInput}
                    setCampusInput={this.props.setCampusInput}
                    setGeneralInput={this.props.setGeneralInput}
                    setTermInput={this.props.setTermInput}
                    setPtrmInput={this.props.setPtrmInput}
                    setProgramsInput={this.props.setProgramsInput}
                    setTimeIniInput={this.props.setTimeIniInput}
                    getTimeIni={this.getTimeIni}
                    onChangeTerm={this.props.onChangeTerm}
                    onChangePtrm={this.props.onChangePtrm}
                    findCourses={this.props.findCourses}
                    cleanForm={this.props.cleanForm} />
            </SideBarLayout>
        )
    }

}

SideBar.propTypes = {
    campus: PropTypes.array,
    attributes: PropTypes.array,
    terms: PropTypes.array,
    ptrms: PropTypes.array,
    programs: PropTypes.array,
    setAttrInput: PropTypes.func,
    setCampusInput: PropTypes.func,
    setGeneralInput: PropTypes.func.isRequired,
    setTermInput: PropTypes.func.isRequired,
    setPtrmInput: PropTypes.func.isRequired,
    setProgramsInput: PropTypes.func.isRequired,
    setTimeIniInput:PropTypes.func.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
    onChangePtrm: PropTypes.func.isRequired,
    findCourses: PropTypes.func.isRequired,
    cleanForm: PropTypes.func.isRequired
}