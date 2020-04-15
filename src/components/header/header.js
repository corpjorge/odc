import React from 'react';
import logo from './AyR_CO_Web.png';
//import PropTypes from 'prop-types';
import './header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header(props) {

    function toggleSideBar() {
        const wrapper = document.getElementById('wrapper');
        wrapper.classList.toggle('toggled');
    }
    return (
        // eslint-disable-next-line
        <Navbar collapseOnSelect expand="lg" bg="light" className="nav-uniandes" variant="light" collapseOnSelect={false}>
            <Navbar.Brand href="https://www.uniandes.edu.co">
                <img className="logo logo-uniandes" alt="logo" src={logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">                     
                    <Nav.Link href="#" id="menu-toggle" onClick={toggleSideBar} className="nav-link">
                        <i className="fas fa-search"></i>Ver | Ocultar filtros
                    </Nav.Link>
                     
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;