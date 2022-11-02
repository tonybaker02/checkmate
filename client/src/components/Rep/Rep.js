
import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { createRepRecord, deleteRepRecord, updateRepRecord, getRepRecord, fetchManagerFirstAndLastName } from '../../actions/Rep';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AuthButton from '../reusable/AuthButton';

export const Rep = ({ createRepRecord, deleteRepRecord, updateRepRecord, getRepRecord, fetchManagerFirstAndLastName }) => {

    const location = useLocation();


    //useEffect Methods ***********
    useEffect(() => {
        const _queryID = location.search;
        if (_queryID !== '') {
            var id = _queryID.substring(_queryID.indexOf('=') + 1);
            //console.log("Id from search " + id);
            setID(id)
            getManagerFirstAndLastName()
            fetchSingeRecordByRecordID(id);
        }
        else {
            getManagerFirstAndLastName()  //need to populate the Manager's Dropdown
        }
    }, [location]);

    useEffect(() => {
        //getManagerFirstAndLastName()
    }, [])

    //const [confirmPassword, setconfirmPassword] = useState('');
    const [id, setID] = useState('');

    const [formData, setFormData] = useState({
        ManagerName: "",
        FirstName: "",
        LastName: "",
        Territory: "",
        Phone: "",
        Email: "",
        AnnualBudget: "",
        Notes: "",
    });

    const {
        ManagerName,
        FirstName,
        LastName,
        Territory,
        Phone,
        Email,
        AnnualBudget,
        Notes,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const clearScreen = () => {
        setFormData({
            ManagerName: "",
            FirstName: "",
            LastName: "",
            Territory: "",
            Phone: "",
            Email: "",
            AnnualBudget: "",
            Notes: "",
        })
    }


    const onSubmit = e => {

        e.preventDefault();

        if (formData.FirstName.length > 0 &&
            formData.Territory.length > 0 &&
            formData.Email.length > 0) {

            console.log(formData)

            if (formData.ManagerName.length > 0 &&
                formData.ManagerName !== '--Select Manager--') {

            } else {
                window.alert("Need a Manager Name selected!");
                return;
            }
        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }

        createRepRecord(formData);
        clearScreen();

    }


    async function fetchSingeRecordByRecordID(id) {
        let _SEARCH_DATA = [];

        _SEARCH_DATA = await getRepRecord(id);

        setID(id)

        //this is done this way below because of a wierd keying in and disappearing field data
        //when you fetch for a record to update ** will research later

        var _ManagerName = document.getElementById('ManagerName')
        _ManagerName.value = _SEARCH_DATA.ManagerName;
        formData.ManagerName = _ManagerName.value;


        var _FirstName = document.getElementById('FirstName')
        _FirstName.value = _SEARCH_DATA.FirstName;
        formData.FirstName = _FirstName.value;

        var _LastName = document.getElementById('LastName')
        _LastName.value = _SEARCH_DATA.LastName;
        formData.LastName = _LastName.value;

        var _Territory = document.getElementById('Territory')
        _Territory.value = _SEARCH_DATA.Territory;
        formData.Territory = _Territory.value;


        var _Phone = document.getElementById('Phone')
        _Phone.value = _SEARCH_DATA.Phone;
        formData.Phone = _Phone.value;


        var _Email = document.getElementById('Email')
        _Email.value = _SEARCH_DATA.Email;
        formData.Email = _Email.value;


        var _AnnualBudget = document.getElementById('AnnualBudget')
        _AnnualBudget.value = _SEARCH_DATA.AnnualBudget;
        formData.AnnualBudget = _AnnualBudget.value;

        var _Notes = document.getElementById('Notes')
        _Notes.value = _SEARCH_DATA.Notes;
        formData.Notes = _Notes.value;

    }


    const UpdateThisRepRecord = e => {
        e.preventDefault();


        console.log(formData)

        if (formData.FirstName.length > 0 &&
            formData.Territory.length > 0 &&
            formData.Email.length > 0) {

            if (formData.ManagerName.length > 0 &&
                formData.ManagerName !== '--Select Manager--') {

            } else {
                window.alert("Need a Manager Name selected!");
                return;
            }

        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }


        updateRepRecord(formData, id);
        clearScreen();

    }

    async function getManagerFirstAndLastName() {

        let _SEARCH_DATA = [];
        _SEARCH_DATA = await fetchManagerFirstAndLastName();
        console.log(_SEARCH_DATA)

        var _ddMangers = document.getElementById('ManagerName');
        removeOptions(_ddMangers)

        _ddMangers.options[_ddMangers.options.length] = new Option('--Select Manager--');
        for (const key in _SEARCH_DATA) {
            _ddMangers.options[_ddMangers.options.length] = new Option(_SEARCH_DATA[key].FirstName + ' ' + _SEARCH_DATA[key].LastName);
        }

    }

    function removeOptions(selectElement) {
        var i, L = selectElement.options.length - 1;
        for (i = L; i >= 0; i--) {
            selectElement.remove(i);
        }
    }


    /*
   const deleteSelectedRepRecord = async (e) => {
       e.preventDefault();

       const confirmBox = window.confirm(
           "Are you sure you want to delete this item?"
       )
       if (confirmBox === true) { } else { return; }

       deleteRepRecord(id);

   }
*/
    return (
        <div className="container">
            <br />
            <h1>
                Rep Management Screen
            </h1>
            <Form onSubmit={e => onSubmit(e)}>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control as="select" aria-label="Select Manager"
                            id="ManagerName"
                            name="ManagerName"
                            style={{ width: '300px' }}
                            value={ManagerName} onChange={e => onChange(e)}
                        >
                        </Form.Control>

                    </Form.Group>

                </Row>

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

                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="input"
                            id="Phone"
                            name="Phone"
                            value={Phone} onChange={e => onChange(e)}

                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="Email" id="Email" name="Email"
                            value={Email} onChange={e => onChange(e)}

                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Annual Budget</Form.Label>
                        <Form.Control
                            type="input"
                            id="AnnualBudget"
                            name="AnnualBudget"
                            value={AnnualBudget} onChange={e => onChange(e)}

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
                            onClick={(e) => deleteSelectedRepRecord(e)}
                            id="btndelete">
                            Delete Record
                            </Button>
                        */}
                        <Button variant="warning"
                            type="button"
                            style={{ marginLeft: '10px' }}
                            onClick={(e) => UpdateThisRepRecord(e)}
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

/*
const myStyles = {
    buttonPadLeft: {
        marginLeft: '2px'
    },
    smallerTextFields: {
        width: '300px',
    }

};
*/

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, { createRepRecord, deleteRepRecord, updateRepRecord, getRepRecord, fetchManagerFirstAndLastName })(Rep)