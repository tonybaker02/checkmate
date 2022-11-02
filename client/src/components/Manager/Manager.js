
import React from 'react'
import { useState} from 'react';
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { createManagerRecord, deleteManagerRecord, updateManagerRecord, getManagerRecord,fetchManagerFirstAndLastName } from '../../actions/Manager';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthButton from '../reusable/AuthButton';


export const Manager = ({ createManagerRecord, deleteManagerRecord, updateManagerRecord, getManagerRecord,fetchManagerFirstAndLastName }) => {

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

    //const [confirmPassword, setconfirmPassword] = useState('');
    const [id, setID] = useState('');
    //const [managerData, setManagerData] = useState([])

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Territory: "",
        Division: "",
        District: "",
        Phone: "",
        Mobile: "",
        Email: "",
        Notes: "",
    });

    const {
        FirstName,
        LastName,
        Territory,
        Division,
        District,
        Phone,
        Mobile,
        Email,
        Notes,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const clearScreen = () => {
        setFormData({
            FirstName: "",
            LastName: "",
            Territory: "",
            Division: "",
            District: "",
            Phone: "",
            Mobile: "",
            Email: "",
            Notes: "",
        })
    }


    const onSubmit = e => {

        e.preventDefault();

        if (formData.FirstName.length > 0 &&
            formData.Territory.length > 0 &&
            formData.District.length > 0) {

        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }

        createManagerRecord(formData);
        clearScreen();

    }

    /*
    async function  getManagerFirstAndLastName(e) {
        e.preventDefault();
        let _SEARCH_DATA = [];
        _SEARCH_DATA = await fetchManagerFirstAndLastName();
        console.log(_SEARCH_DATA)
        //ddMangers
        var _ddMangers = document.getElementById('ddMangers'); 

        _ddMangers.options[_ddMangers.options.length] = new Option('--Select--');
        for(const key in _SEARCH_DATA) {     
            _ddMangers.options[_ddMangers.options.length] = new Option(_SEARCH_DATA[key].FirstName + ' ' + _SEARCH_DATA[key].LastName);
        }

    }
*/
    async function fetchSingeRecordByRecordID(id) {
        let _SEARCH_DATA = [];

        _SEARCH_DATA = await getManagerRecord(id);

        setID(id)

        //this is done this way below because of a wierd keying in and disappearing field data
        //when you fetch for a record to update ** will research later

        var _FirstName = document.getElementById('FirstName')
        _FirstName.value = _SEARCH_DATA.FirstName;
        formData.FirstName = _FirstName.value;

        var _LastName = document.getElementById('LastName')
        _LastName.value = _SEARCH_DATA.LastName;
        formData.LastName = _LastName.value;

        var _Territory = document.getElementById('Territory')
        _Territory.value = _SEARCH_DATA.Territory;
        formData.Territory = _Territory.value;

        var _Division = document.getElementById('Division')
        _Division.value = _SEARCH_DATA.Division;
        formData.Division = _Division.value;

        var _District = document.getElementById('District')
        _District.value = _SEARCH_DATA.District;
        formData.District = _District.value;

        var _Phone = document.getElementById('Phone')
        _Phone.value = _SEARCH_DATA.Phone;
        formData.Phone = _Phone.value;


        var _Mobile = document.getElementById('Mobile')
        _Mobile.value = _SEARCH_DATA.Mobile;
        formData.Mobile = _Mobile.value;


        var _Email = document.getElementById('Email')
        _Email.value = _SEARCH_DATA.Email;
        formData.Email = _Email.value;

        var _Notes = document.getElementById('Notes')
        _Notes.value = _SEARCH_DATA.Notes;
        formData.Notes = _Notes.value;

    }


    const UpdateThisManagerRecord = e => {
        e.preventDefault();

     
        console.log(formData)

        if (formData.FirstName.length > 0 &&
            formData.Territory.length > 0 &&
            formData.District.length > 0) {



        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }


        updateManagerRecord(formData, id);
        clearScreen();

    }


    /*
    const deleteSelectedManagerRecord = async (e) => {
        e.preventDefault();

        const confirmBox = window.confirm(
            "Are you sure you want to delete this item?"
        )
        if (confirmBox === true) { } else { return; }

        deleteManagerRecord(id);

    }
    */

    return (
        <div className="container">
            <br />
            <h1>
                Manager Management Screen
            </h1>
            <Form onSubmit={e => onSubmit(e)}>
                
                {/*}
               <Row className="mb-3">
                    <Form.Group as={Col}>
                        <select class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            style={{ width: 300 }}
                            name='ddMangers'
                            id='ddMangers'
                            >
                        </select>
                    </Form.Group>

                </Row>
              */}
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="input"
                            id="LastName"
                            name="LastName"
                            value={LastName} onChange={e => onChange(e)}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="input"
                            id="FirstName"
                            name="FirstName"
                            value={FirstName} onChange={e => onChange(e)}
                        />
                    </Form.Group>

                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Territory</Form.Label>
                        <Form.Control
                            type="input"
                            id="Territory"
                            name="Territory"
                            value={Territory} onChange={e => onChange(e)}
                            style={myStyles.smallerTextFields}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Division</Form.Label>
                        <Form.Control
                            type="input"
                            id="Division"
                            name="Division"
                            value={Division} onChange={e => onChange(e)}
                            style={myStyles.smallerTextFields}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>District</Form.Label>
                        <Form.Control
                            type="input"
                            id="District"
                            name="District"
                            value={District} onChange={e => onChange(e)}
                            style={myStyles.smallerTextFields}
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
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="Mobile" id="Mobile" name="Mobile"
                            value={Mobile} onChange={e => onChange(e)}
                        />
                    </Form.Group>



                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="Email" id="Email" name="Email"
                            value={Email} onChange={e => onChange(e)}

                        />
                    </Form.Group>
                </Row>


                <Row className="mb-12">
                    <Form.Group as={Col}>
                        <Form.Label>Notes</Form.Label>
                        <textarea className="form-control" id="Notes" name="Notes" rows="5"
                            value={Notes} onChange={e => onChange(e)}>

                        </textarea>
                    </Form.Group>

                </Row>
                <br></br>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Button variant="primary" type="submit"
                        disabled={id !== '' ? true : false}>
                            Submit
                        </Button>
                        {/*
                            <Button variant="danger"
                            type="button"
                            style={{ marginLeft: '10px' }}
                            onClick={(e) => deleteSelectedManagerRecord(e)}
                            id="btndelete">
                            Delete Record
                            </Button>
                        */}
                        <Button variant="warning"
                            type="button"
                            style={{ marginLeft: '10px' }}
                            onClick={(e) => UpdateThisManagerRecord(e)}
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


export default connect(mapStateToProps, { createManagerRecord, deleteManagerRecord, updateManagerRecord, getManagerRecord,fetchManagerFirstAndLastName })(Manager)