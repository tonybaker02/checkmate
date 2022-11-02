import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { searchReceiptRecord } from '../../actions/Receipt';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';




const ReceiptReport = ({ searchReceiptRecord }) => {

    const [tblSearchResults, setSearchResults] = useState([])

    const [formData, setFormData] = useState({
        Rep: "",
        Restaurant: "",
        SearchType: ""
    });

    const {
        Rep,
        Restaurant,

    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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



        let _SEARCH_DATA = [];

        try {
            _SEARCH_DATA = await searchReceiptRecord(formData);
            if (_SEARCH_DATA !== []) {
                setSearchResults(_SEARCH_DATA.receipt)
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

    const rowStyle = { height: '10px', padding: '2px 0' };

    const MyExportCSV = (props) => {
        const handleClick = (e) => {
            e.preventDefault();
            props.onExport();
        };
        return (
            <div>
                <button className="btn btn-success" onClick={(e) => handleClick(e)}>Export to CSV</button>
            </div>
        );
    };

    const columns = [
        {
            dataField: '_id',
            text: '_id',
            hidden: true,
            csvExport: false
        },
        {
            dataField: 'Date',
            text: 'Date',
            sort: true
        },
        {
            dataField: 'Rep',
            text: 'Rep',

            sort: true
        },
        {
            dataField: 'Restaurant',
            text: 'Restaurant',

        },
        {
            dataField: 'Amount',
            text: 'Amount',
        },
        {
            dataField: 'SharedAmount',
            text: 'SharedAmount',
        },
        {
            dataField: 'Doctors',
            text: 'Doctors',
        },


    ];

    return (
        <div className="container">
            <br />
            <h1>
                Receipt Report
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
                                    <option value="Rep">Rep</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="All">All</option>
                                </Form.Control>


                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Representative</Form.Label>
                                <Form.Control type="text"
                                    placeholder=""
                                    id="Rep"
                                    name="Rep"
                                    value={Rep} onChange={e => onChange(e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Resturant</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Restaurant"
                                    id="Restaurant"
                                    name="Restaurant"
                                    value={Restaurant} onChange={e => onChange(e)}
                                />
                            </Form.Group>
                        </Row>

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
                     
                                <ToolkitProvider
                                    keyField="_id"
                                    data={tblSearchResults}
                                    columns={columns}
                                    exportCSV
                                >
                                    {
                                        (props) => (
                                            <div>

                                                <BootstrapTable {...props.baseProps}
                                                    rowStyle={rowStyle}
                                                    striped
                                                    hover
                                                    pagination={paginationFactory({
                                                        showTotal: true,
                                                        firstPageText: 'First',
                                                        lastPageText: 'Last'
                                                    })} />
                                                <br></br>
                                                <MyExportCSV {...props.csvProps} />

                                            </div>
                                        )

                                    }
                                </ToolkitProvider>

                            </Col>
                        </Row>
                    </Form>

                </Card.Body>
            </Card>


        </div>
    );
}



const mapStateToProps = state => ({

})


export default connect(mapStateToProps, { searchReceiptRecord })(ReceiptReport)