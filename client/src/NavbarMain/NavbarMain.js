import React, { Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
//import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useHistory } from "react-router-dom";



const NavbarMain = ({ auth, isAuthenticated }) => {

  const history = useHistory();

  function returnToLogin(e) {
    e.preventDefault();
    history.push(
      {
        pathname: '/Login'
      })
  }


  return (
    <div id="MasterContainer">
      <Fragment>
        {isAuthenticated !== null && isAuthenticated ? (
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#/Login">Check Mate</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#/Login">Home</Nav.Link>

                <NavDropdown title="Medical Office Locations" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/Pharma">Add Pharmaceutical Records</NavDropdown.Item>
                  <NavDropdown.Item href="#/SearchPharma">Search Pharmaceutical Records</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/MedicalGroup">Add Medical Group Records</NavDropdown.Item>
                  <NavDropdown.Item href="#/SearchMedicalGroup">Search Medical Group Records</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Physicians Records" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/Physicians">Add Physicians Records</NavDropdown.Item>
                  <NavDropdown.Item href="#/SearchPhysicians">Search Physicians Records</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Managers / Reps /Reciepts" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/Manager">Add Manager Records</NavDropdown.Item>
                  <NavDropdown.Item href="#/SearchManager">Search Manager Records</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/Rep">Add Rep Records</NavDropdown.Item>
                  <NavDropdown.Item href="#/SearchRep">Search Rep Records</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/Receipt">Add Receipts </NavDropdown.Item>
                  <NavDropdown.Item href="#/SearchReceipt">Search Receipts </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Reports" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/ReceiptReport">Receipt Report</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/RepReport">Rep Report</NavDropdown.Item>
              
                </NavDropdown>

                <Form className="d-flex">
                  <Button variant="outline-success"
                    onClick={(e) => returnToLogin(e)}
                  >Login/Authenticate</Button>
                </Form>

                {/*
                 <NavDropdown title="Client Records" id="basic-nav-dropdown">
                   <NavDropdown.Item href="#/Search">Search</NavDropdown.Item>
                   <NavDropdown.Item href="#/Client">Add</NavDropdown.Item>
                 </NavDropdown>
   
   
                
                 <NavDropdown title="Reports" id="basic-nav-dropdown">
                   <NavDropdown.Item href="#/"></NavDropdown.Item>
                 </NavDropdown>
   
                 <Nav.Link href="#">Administration</Nav.Link>
                 <Nav.Link href="#/test">REDUX AUTH TEST</Nav.Link>
   
               */}
              </Nav>

            </Navbar.Collapse>
          </Navbar>
        ) : (
          <p></p>
        )}

      </Fragment>
    </div>
  )

}

NavbarMain.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
})

export default connect(mapStateToProps)(NavbarMain)