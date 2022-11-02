import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
//import setAuthToken from '../utils/setAuthToken';
//import axios from "axios";
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth';

const Register = ({setAlert,register,isAuthenticated}) => {
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const {
    name,
    email,
    password
  } = formData;


const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async e => {
  e.preventDefault();
  
    console.log(formData);
    console.log(formData.password.length);

  if(formData.password.length < 0){
    setAlert('Please enter a password','danger');
  }
  else{
    register(formData.name,
            formData.email,
            formData.password);
            clearScreen()
      setAlert('User registered','primary');
  }
}


const clearScreen = ()  =>{
  setFormData({name: "",
              email: "",
              password: ""})
}


  return (
    <div className="container">

      <br />
      <h1>
       
      </h1>
      <br />
      <Card className="d-flex justify-content-center" style={{ width: '300px', position:'absolute',left:'40%'}} >
        <Card.Body>
          <Card.Title>Enter Credentials</Card.Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e)
            }}
          >

          <Form.Group className="mb-3" >
              <Form.Label>User Name</Form.Label>
              <Form.Control type="input"
                placeholder="Enter User Name"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="input"
                placeholder="Enter email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)} />
            </Form.Group>

            <Button variant="primary" type="submit" style={myStyles.buttonCustomStyle}>
              Sign Up
            </Button>
          </Form>
          <p>
             Already have an account ?
           <Link to='/Login' className="btn btn-light">
            Sign In
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
  //isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {setAlert,register})(Register)