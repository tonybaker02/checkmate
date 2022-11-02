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
import { deleteReceiptRecord,searchReceiptRecord } from '../../actions/Receipt';

const SearchReceipt = ({ deleteReceiptRecord,searchReceiptRecord }) => {

    const [tblSearchResults, setSearchResults] = useState([])
    const history = useHistory();

    const [formData, setFormData] = useState({
        Rep: "",
        Restaurant: "",
        SearchType:""
      });

      const {
        Rep,
        Restaurant,

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
            _SEARCH_DATA = await searchReceiptRecord(formData);
            //console.log(_SEARCH_DATA)
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

    function showRowDetailInfo(_id) {
        history.push(
            {
                pathname: '/Receipt',
                search: '?id=' + _id,
            })
    }

    const DeleteReceiptRecord = async (e, id) => {
        e.preventDefault();

        const confirmBox = window.confirm(
            "Are you sure you want to delete this item?"
        )
        if (confirmBox === true) { } else { return; }

        await deleteReceiptRecord(id);
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
                <Trash onClick={(e) => DeleteReceiptRecord(e,row._id)} />
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
            dataField: 'Date',
            text: 'Date',
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
                Search Receipts
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


export default connect(mapStateToProps, { deleteReceiptRecord,searchReceiptRecord })(SearchReceipt)