
import React from 'react'
import { useState} from 'react';
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { createPhysiciansRecord, deletePhysiciansRecord, updatePhysiciansRecord,getPhysiciansRecord } from '../../actions/Physicians';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AuthButton from '../reusable/AuthButton';

export const Physicians = ({ createPhysiciansRecord, deletePhysiciansRecord, updatePhysiciansRecord,getPhysiciansRecord }) => {

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
    Title: "",
    FirstName: "",
    MI: "",
    LastName: "",
    NPI: "",
    LicenseID: "",
    Email: "",
    Password: "",
    Notes: "",
  });

  const {
    Title,
    FirstName,
    MI,
    LastName,
    NPI,
    LicenseID,
    Email,
    Phone,
    Password,
    Notes,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearScreen = () => {
    setFormData({
        Title: "",
        FirstName: "",
        MI: "",
        LastName: "",
        NPI: "",
        LicenseID: "",
        Email: "",
        Phone:"",
        Password: "",
        Notes: "",
    })
  }


  const onSubmit = e => {
    e.preventDefault();
    if (formData.FirstName.length > 0 &&
      formData.LicenseID.length > 0 &&
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


    createPhysiciansRecord(formData);
    clearScreen();
  
  }


  async function fetchSingeRecordByRecordID(id) { 
    let _SEARCH_DATA = [];
    
    _SEARCH_DATA = await getPhysiciansRecord(id);

    setID(id)
   
  //this is done this way below because of a wierd keying in and disappearing field data
  //when you fetch for a record to update ** will research later

    var _Title = document.getElementById('Title')
    _Title.value = _SEARCH_DATA.Title;
    formData.Title = _Title.value;

    var _FirstName = document.getElementById('FirstName')
    _FirstName.value = _SEARCH_DATA.FirstName;
    formData.FirstName= _FirstName.value;

    var _MI = document.getElementById('MI')
    _MI.value = _SEARCH_DATA.MI;
    formData.MI= _MI.value;

    var _LastName = document.getElementById('LastName')
    _LastName.value = _SEARCH_DATA.LastName;
    formData.LastName= _LastName.value;

    var _NPI = document.getElementById('NPI')
    _NPI.value = _SEARCH_DATA.NPI;
    formData.NPI= _NPI.value;

    var _LicenseID = document.getElementById('LicenseID')
    _LicenseID.value = _SEARCH_DATA.LicenseID;
    formData.LicenseID= _LicenseID.value;

    var _Email = document.getElementById('Email')
    _Email.value = _SEARCH_DATA.Email;
    formData.Email= _Email.value;

    var _Phone = document.getElementById('Phone')
    _Phone.value = _SEARCH_DATA.Phone;
    formData.Phone= _Phone.value;
    

    var _Password = document.getElementById('Password')
    _Password.value = _SEARCH_DATA.Password;
    formData.Password = _Password.value;

    var _Notes = document.getElementById('Notes')
    _Notes.value = _SEARCH_DATA.Notes;
    formData.Notes= _Notes.value;

   }


  const UpdateThisPhysiciansRecord = e => {
    e.preventDefault();

    var _confirmPassword = document.getElementById('confirmPassword')
    setconfirmPassword(_confirmPassword.value)
    
    console.log(formData)
    
    if (formData.FirstName.length > 0 &&
        formData.LicenseID.length > 0 &&
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
    
   
    updatePhysiciansRecord(formData, id);
    clearScreen();
 
  }

/*
  const deleteSelectedPhysiciansRecord = async (e) => {
    e.preventDefault();

    const confirmBox = window.confirm(
      "Are you sure you want to delete this item?"
    )
    if (confirmBox === true) { } else { return; }

    deletePhysiciansRecord(id);

  }
*/

  return (
    <div className="container">
      <br />
      <h1>
      Physicians Management Screen
      </h1>
      <Form onSubmit={e => onSubmit(e)}>
        <Row className="mb-3">
        <Form.Group as={Col}>
        <Form.Control as="select" aria-label="Title" 
                 id="Title" 
                 name="Title" 
                 style={{width:'100px'}}
                 value={Title} onChange={e => onChange(e)}
                 >
            <option value="-select-">-select-</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
          </Form.Control>
          </Form.Group>

          </Row>
          <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="input"
              id="FirstName"
              name="FirstName"
              value={FirstName} onChange={e => onChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>MI</Form.Label>
            <Form.Control
              type="input"
              id="MI"
              name="MI"
              value={MI} onChange={e => onChange(e)}
            />
          </Form.Group>
     
          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="input"
              id="LastName"
              name="LastName"
              value={LastName} onChange={e => onChange(e)}
            />
          </Form.Group>

        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>NPI</Form.Label>
            <Form.Control
              type="input"
              id="NPI"
              name="NPI"
              value={NPI} onChange={e => onChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>License ID</Form.Label>
            <Form.Control
              type="input"
              id="LicenseID"
              name="LicenseID"
              value={LicenseID} onChange={e => onChange(e)}
            />
          </Form.Group>

        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="input"
              id="Email"
              name="Email"
              value={Email} onChange={e => onChange(e)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="Phone" id="Phone" name="Phone"
              value={Phone} onChange={e => onChange(e)} />
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
              onClick={(e) => deleteSelectedPhysiciansRecord(e)}
              id="btndelete">
              Delete Record
            </Button>
           */}
            <Button variant="warning"
              type="button"
              style={{ marginLeft: '10px' }}
              onClick={(e) => UpdateThisPhysiciansRecord(e)}
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


export default connect(mapStateToProps, { createPhysiciansRecord, deletePhysiciansRecord, updatePhysiciansRecord,getPhysiciansRecord})(Physicians)