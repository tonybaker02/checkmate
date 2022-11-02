
import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { createPharmaRecord, deletePharmaRecord, updatePharmaRecord, getPharmaRecord } from '../../actions/Pharma';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthButton from '../reusable/AuthButton';


export const Pharma = ({ createPharmaRecord, deletePharmaRecord, updatePharmaRecord, getPharmaRecord }) => {

  const location = useLocation();


  //useEffect Methods ***********
  useEffect(() => {
    const _queryID = location.search;
    if (_queryID !== '') {
      var id = _queryID.substring(_queryID.indexOf('=') + 1);

      setID(id)
      fetchSingeRecordByRecordID(id);
    }
  }, [location]);

  const [confirmPassword, setconfirmPassword] = useState('');
  const [id, setID] = useState('');

  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Password: "",
    Notes: "",
  });

  const {
    Name,
    Phone,
    Email,
    Password,
    Notes,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearScreen = () => {
    setFormData({
      Name: "",
      Phone: "",
      Email: "",
      Password: "",
      Notes: "",
    })
  }


  const onSubmit = e => {
    e.preventDefault();
    if (formData.Name.length > 0 &&
      formData.Phone.length > 0 &&
      formData.Email.length > 0) {

      console.log('Confirmed Password: ' + confirmPassword)
      if (confirmPassword === formData.Password) {

      }
      else {
        window.alert("Passwords do not match!!!");
        return;
      }

    }
    else {
      window.alert("Missing required field entries!!!");
      return;
    }

    createPharmaRecord(formData);
    clearScreen();
    console.log(formData)
  }


  async function fetchSingeRecordByRecordID(id) {
    let _SEARCH_DATA = [];

    _SEARCH_DATA = await getPharmaRecord(id);

    setID(id)



    var _Name = document.getElementById('Name')
    _Name.value = _SEARCH_DATA.Name;
    formData.Name = _Name.value;

    var _Phone = document.getElementById('Phone')
    _Phone.value = _SEARCH_DATA.Phone;
    formData.Phone = _Phone.value;

    var _Email = document.getElementById('Email')
    _Email.value = _SEARCH_DATA.Email;
    formData.Email = _Email.value;

    var _password = document.getElementById('Password')
    _password.value = _SEARCH_DATA.Password;
    formData.Password = _password.value;

    var _Notes = document.getElementById('Notes')
    _Notes.value = _SEARCH_DATA.Notes;
    formData.Notes = _Notes.value;

  }


  const updatepharmaceuticalRecord = e => {
    e.preventDefault();

    var _confirmPassword = document.getElementById('confirmPassword')
    setconfirmPassword(_confirmPassword.value)

    console.log(formData)

    if (formData.Name.length > 0 &&
      formData.Phone.length > 0 &&
      formData.Email.length > 0) {


      console.log('Confirmed Password: ' + confirmPassword)

      if (confirmPassword === formData.Password) {

      }
      else {
        window.alert("Passwords do not match!!!");
        return;
      }

    }
    else {
      window.alert("Missing required field entries!!!");
      return;
    }


    updatePharmaRecord(formData, id);
    clearScreen();

  }


  /*
  const deleteSelectedPharmaRecord = async (e) => {
    e.preventDefault();

    const confirmBox = window.confirm(
      "Are you sure you want to delete this item?"
    )
    if (confirmBox === true) { } else { return; }

    deletePharmaRecord(id);

  }
  */

  return (
    <div className="container">
      <br />
      <h1>
        Pharmaceutical Company Management Screen
      </h1>
      <Form onSubmit={e => onSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="input"
              id="Name"
              name="Name"
              value={Name} onChange={e => onChange(e)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="input"
              id="Phone"
              name="Phone"
              value={Phone} onChange={e => onChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" id="Email" name="Email"
              value={Email} onChange={e => onChange(e)} />
          </Form.Group>
        </Row>


        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="Password" name="Password"
            value={Password} onChange={e => onChange(e)}
            style={myStyles.smallerTextFields} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" id="confirmPassword" name="confirmPassword"
            onChange={e => setconfirmPassword(e.target.value)}
            style={myStyles.smallerTextFields} />
        </Form.Group>

        <Row className="mb-12">
          <Form.Group as={Col}>
            <Form.Label>Notes</Form.Label>
            <textarea className="form-control" id="Notes" name="Notes" rows="5"
              value={Notes} onChange={e => onChange(e)}>

            </textarea>
          </Form.Group>

        </Row>
        <br></br>
        <Row className="mb-6">
          <Form.Group as={Col}>
            <Button variant="primary" type="submit"
              disabled={id !== '' ? true : false}>
              Submit
            </Button>
            {/*
            <Button variant="danger"
              type="button"
              style={{ marginLeft: '10px' }}
              onClick={(e) => deleteSelectedPharmaRecord(e)}
              id="btndelete">
              Delete Record
            </Button>
           */}
            <Button variant="warning"
              type="button"
              style={{ marginLeft: '10px' }}
              onClick={(e) => updatepharmaceuticalRecord(e)}
              id="btnUpdate"
              disabled={id !== '' ? false : true}>
              Update Record
            </Button>

            <Button variant="success"
              type="button"
              style={{ marginLeft: '10px' }}
              onClick={(e) => clearScreen(e)}
              id="btnClearScreen"
              disabled={id !== '' ? true : false}
            >
              Add New
            </Button>
          </Form.Group>
        </Row>
        <br></br>
        <Row className="mb-3">
          <AuthButton />
        </Row>
      </Form>
    </div>
  );

}


const myStyles = {
  buttonPadLeft: {
    marginLeft: '2px'
  },
  smallerTextFields: {
    width: '300px',
  }

};

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, { createPharmaRecord, deletePharmaRecord, updatePharmaRecord, getPharmaRecord })(Pharma)