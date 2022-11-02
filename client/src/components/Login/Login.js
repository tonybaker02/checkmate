import React, { useState,useRef } from 'react'
import { connect } from 'react-redux';
import { setLoginData } from '../../actions/login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import {setAlert} from '../../actions/alert'
import  {login} from '../../actions/auth'

const Login = ({ setLoginData, setAlert,login}) => {
const email = useRef();
const password = useRef();


const onSubmit = async e => {
  e.preventDefault();
  
  if(password < 0){
    setAlert('Please enter a password','danger');
  }
  else{
      login(email.current.value,
           password.current.value);
      clearScreen()
      setAlert('Login Sucessfull','primary');
  }
}


const clearScreen = ()  =>{
  email.current.value = '';
  password.current.value = '';

}


  return (
    <div className="container">

      <br />
      <h1>
       
      </h1>
      <br />
      <Card className="d-flex justify-content-center" style={{ width: '300px', position:'absolute',left:'40%'}} >
        <Card.Body>
          <Card.Title>Enter your Login Credentials</Card.Title>
          <Form
           onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e)
          }}
          >
            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="input"
                placeholder="Enter email"
                ref={email} 
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={password} 
               />
            </Form.Group>

            <Button variant="primary" type="submit" style={myStyles.buttonCustomStyle}>
              Sign In
            </Button>
          </Form>
          <p>
             Dont' have an account
           <Link to='/Register' className="btn btn-light">
            Sign Up
          </Link>
        </p>

        </Card.Body>
      </Card>

    </div>
  );
}

const myStyles = {
  buttonPadLeft: {
      marginLeft: '2px'
  },
  smallerTextFields: {
      width: '300px',
  },
  buttonCustomStyle: {
    width:'100%'
  }

};
const mapStateToProps = state => ({

})


export default connect(mapStateToProps, { setLoginData,setAlert,login })(Login)