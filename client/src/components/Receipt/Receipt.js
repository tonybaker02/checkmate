
import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { createReceiptRecord, deleteReceiptRecord, updateReceiptRecord, getReceiptRecord, fetchRepFirstAndLastName } from '../../actions/Receipt';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthButton from '../reusable/AuthButton';


export const Receipt = ({ createReceiptRecord, deleteReceiptRecord, updateReceiptRecord, getReceiptRecord, fetchRepFirstAndLastName }) => {

    const location = useLocation();


    //useEffect Methods ***********
    useEffect(() => {
        const _queryID = location.search;
        if (_queryID !== '') {
            var id = _queryID.substring(_queryID.indexOf('=') + 1);
            //console.log("Id from search " + id);
            setID(id)
            getRepFirstAndLastName()
            fetchSingeRecordByRecordID(id);
        }
    }, [location]);

    useEffect(() => {
        //getRepFirstAndLastName()
    }, [])


    const [id, setID] = useState('');

    const [formData, setFormData] = useState({
        Rep: "",
        Restaurant: "",
        Amount: "",
        SharedAmount: "",
        Date: "",
        Event: "",
        Doctors: "",
        Notes: "",
    });

    const {
        Rep,
        Restaurant,
        Amount,
        SharedAmount,
        Date,
        Event,
        Doctors,
        Notes,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const clearScreen = () => {
        setFormData({
            Rep: "",
            Restaurant: "",
            Amount: "",
            SharedAmount: "",
            Date: "",
            Event: "",
            Doctors: "",
            Notes: "",
        })
    }


    const onSubmit = e => {

        e.preventDefault();

        if (formData.Rep.length > 0 &&
            formData.Restaurant.length > 0) {

        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }

        createReceiptRecord(formData);
        clearScreen();

    }

    async function getRepFirstAndLastName() {

        let _SEARCH_DATA = [];
        _SEARCH_DATA = await fetchRepFirstAndLastName();
        console.log(_SEARCH_DATA)


        var _ddReps = document.getElementById('Rep');
        removeOptions(_ddReps)

        _ddReps.options[_ddReps.options.length] = new Option('--Select Rep--');
        for (const key in _SEARCH_DATA) {
            _ddReps.options[_ddReps.options.length] = new Option(_SEARCH_DATA[key].FirstName + ' ' + _SEARCH_DATA[key].LastName);
        }

    }

    function removeOptions(selectElement) {
        var i, L = selectElement.options.length - 1;
        for (i = L; i >= 0; i--) {
            selectElement.remove(i);
        }
    }


    async function fetchSingeRecordByRecordID(id) {
        let _SEARCH_DATA = [];

        _SEARCH_DATA = await getReceiptRecord(id);

        setID(id)

        //this is done this way below because of a wierd keying in and disappearing field data
        //when you fetch for a record to update ** will research later

        var _Rep = document.getElementById('Rep')
        _Rep.value = _SEARCH_DATA.Rep;
        formData.Rep = _Rep.value;

        var _Restaurant = document.getElementById('Restaurant')
        _Restaurant.value = _SEARCH_DATA.Restaurant;
        formData.Restaurant = _Restaurant.value;

        var _Amount = document.getElementById('Amount')
        _Amount.value = _SEARCH_DATA.Amount;
        formData.Amount = _Amount.value;

        var _SharedAmount = document.getElementById('SharedAmount')
        _SharedAmount.value = _SEARCH_DATA.SharedAmount;
        formData.SharedAmount = _SharedAmount.value;

        var _Date = document.getElementById('Date')
        _Date.value = _SEARCH_DATA.Date;
        formData.Date = _Date.value;

        var _Event = document.getElementById('Event')
        _Event.value = _SEARCH_DATA.Event;
        formData.Event = _Event.value;


        var _Doctors = document.getElementById('Doctors')
        _Doctors.value = _SEARCH_DATA.Doctors;
        formData.Doctors = _Doctors.value;

        var _Notes = document.getElementById('Notes')
        _Notes.value = _SEARCH_DATA.Notes;
        formData.Notes = _Notes.value;

    }


    const UpdateThisReceiptRecord = e => {
        e.preventDefault();


        console.log(formData)

        if (formData.Rep.length > 0 &&
            formData.Restaurant.length > 0) {



        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }


        updateReceiptRecord(formData, id);
        clearScreen();

    }

    /*
     const deleteSelectedReceiptRecord = async (e) => {
         e.preventDefault();
 
         const confirmBox = window.confirm(
             "Are you sure you want to delete this item?"
         )
         if (confirmBox === true) { } else { return; }
 
         deleteReceiptRecord(id);
 
     }
 */

    return (
        <div className="container">
            <br />
            <h1>
                Receipt Management Screen
            </h1>
            <Form onSubmit={e => onSubmit(e)}>
                <Row className="mb-3">

                    <Form.Group as={Col}>
                        {/*
                        <Form.Label>Representative</Form.Label>
                        <Form.Control
                            type="input"
                            id="Rep"
                            name="Rep"
                            value={Rep} onChange={e => onChange(e)}
                        />
                    */}

                        <Form.Control as="select" aria-label="Select Rep"
                            id="Rep"
                            name="Rep"
                            style={{ width: '300px' }}
                            value={Rep} onChange={e => onChange(e)}
                        >
                        </Form.Control>
                    </Form.Group>


                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col}>
                        <Form.Label>Restaurant</Form.Label>
                        <Form.Control
                            type="input"
                            id="Restaurant"
                            name="Restaurant"
                            value={Restaurant} onChange={e => onChange(e)}
                        />
                    </Form.Group>
                </Row>



                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="input"
                            id="Amount"
                            name="Amount"
                            value={Amount} onChange={e => onChange(e)}
                            style={myStyles.smallerTextFields}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Shared Amount</Form.Label>
                        <Form.Control
                            type="input"
                            id="SharedAmount"
                            name="SharedAmount"
                            value={SharedAmount} onChange={e => onChange(e)}
                            style={myStyles.smallerTextFields}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="input"
                            id="Date"
                            name="Date"
                            value={Date} onChange={e => onChange(e)}
                            style={myStyles.smallerTextFields}
                        />
                    </Form.Group>

                </Row>


                <Row className="mb-12">
                    <Form.Group as={Col}>
                        <Form.Label>Event</Form.Label>
                        <textarea class="form-control" id="Event" name="Event" rows="5"
                            value={Event} onChange={e => onChange(e)}>

                        </textarea>
                    </Form.Group>

                </Row>

                <Row className="mb-12">
                    <Form.Group as={Col}>
                        <Form.Label>Doctors</Form.Label>
                        <textarea class="form-control" id="Doctors" name="Doctors" rows="5"
                            value={Doctors} onChange={e => onChange(e)}>

                        </textarea>
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
                            onClick={(e) => deleteSelectedReceiptRecord(e)}
                            id="btndelete">
                            Delete Record
                            </Button>
                        */}
                        <Button variant="warning"
                            type="button"
                            style={{ marginLeft: '10px' }}
                            onClick={(e) => UpdateThisReceiptRecord(e)}
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


export default connect(mapStateToProps, { createReceiptRecord, deleteReceiptRecord, updateReceiptRecord, getReceiptRecord, fetchRepFirstAndLastName })(Receipt)