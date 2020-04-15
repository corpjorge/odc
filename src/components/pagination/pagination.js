import React, { Component } from 'react';
import './pagination.css';
import PropTypes from 'prop-types';
export default class Pagination extends Component {

    constructor(props) {
        super(props);
        this.STEP = 3
        this.changePage = this.changePage.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.initPages= this.initPages.bind(this);
        this.changeActiveNav=this.changeActiveNav.bind(this);
        this.state = {
            pages:[],
            lastPage: this.STEP,
            firstPage: 1,
            currentPage: 1
        }
    }

    componentDidMount(){
        const pages = [];
        for (let i = 1; i <= this.STEP; i++) {
            pages.push(i);
        }
        this.setState({
            pages
        })
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.currentPage ===1 && prevState.currentPage>this.state.currentPage){
            this.changeActiveNav(this.state.firstPage);
        }
        else if(prevState.firstPage<this.state.firstPage ){
            this.changePage(this.state.firstPage);
        }else if(prevState.lastPage>this.state.lastPage){
            this.changePage(this.state.lastPage);
        }
        if(prevProps.filterParams!==this.props.filterParams){
            this.initPages();
        }
    }

    initPages(){
        const pages = [];
        for (let i = 1; i <= this.STEP; i++) {
            pages.push(i);
        }
        this.setState ({
            pages,
            lastPage: this.STEP,
            firstPage: 1,
            currentPage: 1
        })
    }

    changePage(pag) {
        this.setState({
            currentPage: pag
        })
        this.changeActiveNav(pag);
        this.props.onChangePage(pag);
    }

    changeActiveNav(pag){
        const antiguos = document.getElementsByClassName('activenav');
        
        for (let i = 0; i < antiguos.length; i++) {
            antiguos[i].className = antiguos[i].className.replace('activenav', '');
            
        }

        const bts = document.getElementsByName('pag-' + pag);
        for (let j = 0; j < bts.length; j++) {
            bts[j].className = bts[j].className + ' activenav';
        }
    }

    onClickNext() {

        if (this.state.currentPage < this.state.lastPage) {
            this.changePage(this.state.currentPage + 1);
        } else {
            const pages = [];
            const step = this.STEP;

            for (let i = this.state.firstPage + step; i <= this.state.lastPage + step; i++) {
                pages.push(i);
            }

            this.setState((prevState) => {
                return {
                    pages,
                    firstPage: prevState.firstPage + step,
                    lastPage: prevState.lastPage + step
                }
            })
        }

    }

    onClickPrev() {
        if (this.state.currentPage > this.state.firstPage) {
            this.changePage(this.state.currentPage - 1);
        } else {
            const step = this.STEP;
            const pages = [];
            for (let i = this.state.firstPage - step; i <= this.state.lastPage - step; i++) {
                pages.push(i);
            }

            this.setState((prevState) => {
                return {
                    pages,
                    firstPage: prevState.firstPage - step,
                    lastPage: prevState.lastPage - step
                }
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        return nextState.page!==this.state.pages || nextState.currentPage!==this.state.currentPage
    }

    render() {
        const disablePrev=this.state.currentPage===1?'disabled':'';
        const disableNext= this.props.courseDone?'disabled':'';
        return (
            <nav aria-label="navegacion cursos">
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${disablePrev}`}>
                        <button type="button" className="btn btn-link page-link" onClick={this.onClickPrev}>Anterior</button>
                    </li>
                    {
                        this.state.pages.map((item, index) => {
                            let active =index === 0?'activenav':'';
                            return <li id={`pag-${item}`} name={`pag-${item}`}  className={`page-item ${active}`} key={index}>
                                <button type="button" 
                                        className="btn btn-link page-link" 
                                        onClick={() => { this.changePage(item) }}>
                                    {item}
                                </button>
                            </li>
                        })
                    }
                    <li className={`page-item ${disableNext}`}>
                        <button type="button" className="btn btn-link page-link" onClick={this.onClickNext}>Siguiente</button>
                    </li>
                </ul>
            </nav>
        )
    }
}
Pagination.propTypes = {
    onChangePage: PropTypes.func.isRequired,
    courseDone:PropTypes.bool.isRequired,
    filterParams:PropTypes.object.isRequired
}
