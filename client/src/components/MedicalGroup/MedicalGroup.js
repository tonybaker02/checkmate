
import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { createMedicalGroupRecord, deleteMedicalGroupRecord, updateMedicalGroupRecord,getMedicalGroupRecord } from '../../actions/MedicalGroup';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AuthButton from '../reusable/AuthButton'

export const MedicalGroup = ({ createMedicalGroupRecord, deleteMedicalGroupRecord, updateMedicalGroupRecord,getMedicalGroupRecord }) => {

  const location = useLocation();
 

  //useEffect Methods ***********
  useEffect(() => {
    const _queryID = location.search;
    if (_queryID !== '') {
      var id = _queryID.substring(_queryID.indexOf('=') + 1);
      //console.log("Id from search " + id);
      setID(id)
      fetchSingeRecordByRecordID(id);
    }
  }, [location]);

  const [confirmPassword, setconfirmPassword] = useState('');
  const [id, setID] = useState('');

  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Office: "",
    Mobile: "",
    Email: "",
    Password: "",
    Notes: "",
  });

  const {
    Name,
    Address,
    Office,
    Mobile,
    Email,
    Password,
    Notes,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearScreen = () => {
    setFormData({
        Name: "",
        Address: "",
        Office: "",
        Mobile: "",
        Email: "",
        Password: "",
        Notes: "",
    })
  }


  const onSubmit = e => {
    e.preventDefault();
    if (formData.Name.length > 0 &&
      formData.Office.length > 0 &&
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

    createMedicalGroupRecord(formData);
    clearScreen();
    console.log(formData)
  }


  async function fetchSingeRecordByRecordID(id) { 
    let _SEARCH_DATA = [];
    
    _SEARCH_DATA = await getMedicalGroupRecord(id);

    setID(id)
   
  //this is done this way below because of a wierd keying in and disappearing field data
  //when you fetch for a record to update ** will research later

    var _Name = document.getElementById('Name')
    _Name.value = _SEARCH_DATA.Name;
    formData.Name = _Name.value;

    var _Address = document.getElementById('Address')
    _Address.value = _SEARCH_DATA.Address;
    formData.Address= _Address.value;

    var _Office = document.getElementById('Office')
    _Office.value = _SEARCH_DATA.Office;
    formData.Office= _Office.value;

    var _Mobile = document.getElementById('Mobile')
    _Mobile.value = _SEARCH_DATA.Mobile;
    formData.Mobile= _Mobile.value;

    var _Email = document.getElementById('Email')
    _Email.value = _SEARCH_DATA.Email;
    formData.Email= _Email.value;

    var _Password = document.getElementById('Password')
    _Password.value = _SEARCH_DATA.Password;
    formData.Password= _Password.value;

    var _Notes = document.getElementById('Notes')
    _Notes.value = _SEARCH_DATA.Notes;
    formData.Notes= _Notes.value;
    
   }


  const UpdateThisMedicalGroupRecord = e => {
    e.preventDefault();

    var _confirmPassword = document.getElementById('confirmPassword')
    setconfirmPassword(_confirmPassword.value)
    
    console.log(formData)
    
    if (formData.Name.length > 0 &&
      formData.Office.length > 0 &&
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
    
   
    updateMedicalGroupRecord(formData, id);
    clearScreen();
 
  }

  /*

  const deleteSelectedMedicalGroupRecord = async (e) => {
    e.preventDefault();

    const confirmBox = window.confirm(
      "Are you sure you want to delete this item?"
    )
    if (confirmBox === true) { } else { return; }

    deleteMedicalGroupRecord(id);

  }
  */

  return (
    <div className="container">
      <br />
      <h1>
        Medical Group Management Screen
      </h1>
      <Form onSubmit={e => onSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Medical Group Name</Form.Label>
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
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="input"
              id="Address"
              name="Address"
              value={Address} onChange={e => onChange(e)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Office</Form.Label>
            <Form.Control
              type="input"
              id="Office"
              name="Office"
              value={Office} onChange={e => onChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="Mobile" id="Mobile" name="Mobile"
              value={Mobile} onChange={e => onChange(e)} />
          </Form.Group>
        </Row>

   
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="Email" id="Email" name="Email"
            value={Email} onChange={e => onChange(e)}
             />
        </Form.Group>

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
              onClick={(e) => deleteSelectedMedicalGroupRecord(e)}
              id="btndelete">
              Delete Record
            </Button>
           */}
            <Button variant="warning"
              type="button"
              style={{ marginLeft: '10px' }}
              onClick={(e) => UpdateThisMedicalGroupRecord(e)}
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


export default connect(mapStateToProps, { createMedicalGroupRecord, deleteMedicalGroupRecord, updateMedicalGroupRecord,getMedicalGroupRecord})(MedicalGroup)