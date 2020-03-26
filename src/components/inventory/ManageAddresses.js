import React, { Component } from 'react'
import { Button, Form, Col, Row, Table } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'


class ManageAddresses extends Component {

    state = {
        addressList: [],
        selectedAddressId: 0,
        rowClassNameList: []
    }

    componentDidMount() {
        apiManager.get('addresses')
            .then(addresses => {
                this.setState({
                    addressList: addresses,
                })
                this.createRowClassNameList(addresses)
            })
    }

    handleAddAddress = () => {

        const newAddress = {
            street: this.refs.street.value,
            city: this.refs.city.value,
            state: this.refs.state.value,
            zip_code: this.refs.zipCode.value
        }

        apiManager.post('addresses', newAddress)
            .then(r => {
                apiManager.get('addresses')
                    .then(addresses => {
                        this.setState({
                            addressList: addresses,
                        })
                        this.createRowClassNameList(addresses)
                    })
            })
        this.clearAllInputFields()
    }

    clearAllInputFields = () => {
        for(let ref in this.refs) {
            this.refs[ref].value = ''
        }
    }

    handleDeleteAddress = (id) => {
        if (this.state.selectedAddressId !== 0) {
            apiManager.delete('addresses', id)
                .then(r => {
                    apiManager.get('addresses')
                        .then(addresses => {
                            this.setState({
                                addressList: addresses,
                            })
                            this.createRowClassNameList(addresses)
                        })
                })
        } else {
            window.alert('Please select an address to delete')
        }
    }

    updateClassNameList = (indx) => {
        let tempClassNameList = []
        this.state.rowClassNameList.forEach((cn, indx2) => {
            if (indx2 === indx) {
                tempClassNameList.push('highlighted-row')
            } else {
                tempClassNameList.push('')
            }
        })
        this.setState({
            rowClassNameList: tempClassNameList
        })
    }

    createRowClassNameList = (addressList) => {
        let tempClassNameList = []
        addressList.forEach(address => {
            tempClassNameList.push('')
        })
        this.setState({
            rowClassNameList: tempClassNameList
        })
    }

    render() {
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead className="table-bottom-margin">
                        <tr>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.addressList.map((address, indx) => {
                            return (
                                <tr className={this.state.rowClassNameList[indx]} key={address.id} onClick={() => {
                                    this.updateClassNameList(indx)
                                    this.setState({ selectedAddressId: address.id })
                                }}>
                                    <td>{address.street}</td>
                                    <td>{address.city}</td>
                                    <td>{address.state}</td>
                                    <td>{address.zip_code}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Button className="item-detail-btn" onClick={() => this.handleDeleteAddress(this.state.selectedAddressId)}>Delete Address</Button>

                <h2 className="inv-title">Add Address</h2>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Street
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" ref="street" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            City
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" ref="city" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            State
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" ref="state" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Zip Code
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" ref="zipCode" />
                        </Col>
                    </Form.Group>

                    <Button className="item-detail-btn" onClick={this.handleAddAddress}>Save</Button>
                    <Button className="item-detail-btn" onClick={() => {
                        if(this.props.returnToEditItem) {
                            this.props.returnToEditItem()
                        }
                        else {
                            this.props.returnToAddItem()
                        }
                    }}>Cancel</Button>
                </Form>
            </>
        )
    }
}

export default ManageAddresses