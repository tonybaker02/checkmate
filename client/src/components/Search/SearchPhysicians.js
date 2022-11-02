import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { useHistory } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BinocularsFill } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import { deletePhysiciansRecord,searchPhysiciansRecord } from '../../actions/Physicians';

const SearchPhysicians = ({ deletePhysiciansRecord,searchPhysiciansRecord }) => {

    const [tblSearchResults, setSearchResults] = useState([])
    const history = useHistory();

    const [formData, setFormData] = useState({
        LastName: "",
        LicenseID: "",
        Email:"",
        SearchType:""
      });

      const {
        LastName,
        LicenseID,
        Email,

      } = formData;

      const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onChangeOfDDSearch = (e) => {
        e.preventDefault();
        var _ItemTypeSelect = document.getElementById('SearchType');
        formData.SearchType = _ItemTypeSelect.value
    }

    const searchRecords = async (e) => {
        e.preventDefault();
        
        if (formData.SearchType !== "--Select Type--") {

        }
        else {
            window.alert("Please select a search criteria !!!");
            return;
        }
 
      //console.log(formData)


        let _SEARCH_DATA = [];

        try {
            _SEARCH_DATA = await searchPhysiciansRecord(formData);
            //console.log(_SEARCH_DATA)
            if (_SEARCH_DATA !== []) {
                setSearchResults(_SEARCH_DATA.physicians)
            }
            else {
                setSearchResults([]);
            }

        }
        catch (err) {
            console.log(err)
            setSearchResults([]);
        }

    }

    function showRowDetailInfo(_id) {
        history.push(
            {
                pathname: '/Physicians',
                search: '?id=' + _id,
            })
    }

    const DeleteThisPhysiciansRecord = async (e, id) => {
        e.preventDefault();

        const confirmBox = window.confirm(
            "Are you sure you want to delete this item?"
        )
        if (confirmBox === true) { } else { return; }

        await deletePhysiciansRecord(id);
        setSearchResults([]);

    }


    function CellFormatter(cell, row) {
        return (
            <div>
                <BinocularsFill onClick={() => showRowDetailInfo(row._id)} />
            </div>
        );
    }

    function CellFormatterDelete(cell, row) {
        return (
            <div>
                <Trash onClick={(e) => DeleteThisPhysiciansRecord(e,row._id)} />
            </div>
        );
    }

    const columns = [
        {
            dataField: '_id',
            text: '_id',
            sort: true
        },
        {
            dataField: 'FirstName',
            text: 'FirstName',
            sort: true
        },
        {
            dataField: 'LastName',
            text: 'LastName',
        },
        {
            dataField: 'Email',
            text: 'Email',
        },
        {
            dataField: 'Phone',
            text: 'Phone',
        },
        {
            dataField: 'LicenseID',
            text: 'LicenseID',
        },
        {
            dataField: '1',
            text: 'Edit',
            formatter: CellFormatter,
            style: { width: '10px' }
        },
        {
            dataField: '2',
            text: 'Delete',
            formatter: CellFormatterDelete,
            style: { width: '10px' }
        },
    ];

    return (
        <div className="container">
            <br />
            <h1>
                Search Physicians
            </h1>
            <br />
            <Card>
                <Card.Body>
                    <Card.Title>Enter Search Criteria</Card.Title>
                    <Form>


                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Control as="select" aria-label="Search Type"
                                    id="SearchType"
                                    name="SearchType"
                                    style={{ width: '200px' }}
                                    onChange={(e) => onChangeOfDDSearch(e)}
                                    >
                                    <option>--Select Type--</option>
                                    <option value="LastName">LastName</option>
                                    <option value="LicenseID">LicenseID</option>
                                    <option value="Email">Email</option>
                                    <option value="All">All</option>
                                </Form.Control>


                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>License ID</Form.Label>
                                <Form.Control type="text" 
                                placeholder="Enter LicenseID" 
                                id="LicenseID" 
                                name="LicenseID"
                                value={LicenseID} onChange={e => onChange(e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" 
                                 placeholder="LastName" 
                                 id="LastName"
                                 name="LastName" 
                                 value={LastName} onChange={e => onChange(e)}
                                 />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" 
                                 placeholder="Email" 
                                 id="Email"
                                 name="Email" 
                                 value={Email} onChange={e => onChange(e)}
                                 />
                            </Form.Group>

                        </Row>


                        {/*
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>#</InputGroup.Text>
                                    <Form.Control id="id" />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                       */}

                        <Button
                            variant="primary"
                            type="button"
                            onClick={(e) => searchRecords(e)}
                        >
                            Search Records
                        </Button>
                        <br></br>
                        <hr></hr>
                        <Row>
                            <Col sm={12}>
                                <h2>Search Results</h2>

                                <BootstrapTable
                                    striped
                                    hover
                                    keyField="_id"
                                    data={tblSearchResults}
                                    columns={columns}
                                    pagination={paginationFactory({
                                        showTotal: true,
                                        firstPageText: "First",
                                        lastPageText: "Last",
                                    })}

                                />
                            </Col>
                        </Row>
                    </Form>

                </Card.Body>
            </Card>

            <br></br>
            <hr></hr>



        </div>
    );
}



const mapStateToProps = state => ({

})


export default connect(mapStateToProps, { deletePhysiciansRecord,searchPhysiciansRecord })(SearchPhysicians)