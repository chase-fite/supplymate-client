import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'
import deloImage from '../../images/delo-400.jpeg'
import ManageAddresses from './ManageAddresses'
import ManageItemTypes from './ManageItemTypes'


class AddItemForm extends Component {

    state = {
        itemTypeList: [],
        addressList: [],
        mode: ''
    }

    componentDidMount() {
        apiManager.get('itemtypes')
            .then(itemTypes => {
                apiManager.get('addresses')
                    .then(addresses => {
                        this.setState({
                            itemTypeList: itemTypes,
                            addressList: addresses
                        })
                    })
            })
    }

    handleAddItem = () => {
        // I need to check if item type already exists and if it doesn't then i need to create a new one
        // I need to do the same thing with address

        const newItem = {
            stock: this.refs.stock.value,
            quantity: this.refs.quantity.value,
            name: this.refs.name.value,
            item_type_id: this.refs.itemTypeId.value,
            description: this.refs.description.value,
            serial_number: this.refs.serialNumber.value,
            price: this.refs.price.value,
            storage_location: this.refs.storageLocation.value,
            address_id: this.refs.addressId.value
        }

        apiManager.post('items', newItem)
            .then(r => this.props.history.push('/inventory'))
    }

    renderAddAddress = () => {
        this.setState({
            mode: 'addAddress'
        })
    }

    renderAddItemType = () => {
        this.setState({
            mode: 'addItemType'
        })
    }

    returnToAddItem = () => {
        apiManager.get('itemtypes')
            .then(itemTypes => {
                apiManager.get('addresses')
                    .then(addresses => {
                        this.setState({
                            itemTypeList: itemTypes,
                            addressList: addresses,
                            mode: ''
                        })
                    })
            })
    }

    view = (mode) => {
        switch (mode) {
            case 'addAddress':
                return <ManageAddresses returnToEditItem={this.returnToAddItem} />
            case 'addItemType':
                return <ManageItemTypes returnToEditItem={this.returnToAddItem} />
            default:
                return (
                    <>
                        <div className="flex">
                            <div>
                                <img className="image" src={deloImage} alt="delo 400" />
                            </div>
                        </div>

                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Name
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="name" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Stock
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="stock" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Quantity
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="quantity" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Type
                                </Form.Label>
                                <Col sm="6">
                                    <select className="address-select" ref="itemTypeId">
                                        {this.state.itemTypeList.map(itemType => {
                                            return (
                                                <option key={itemType.id} value={itemType.id}>{itemType.name}</option>
                                            )
                                        })}
                                    </select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Description
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="description" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Serial Number
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="serialNumber" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Price
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="price" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Storage Location
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="storageLocation" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Address
                                </Form.Label>
                                <Col sm="6">
                                    <select className="address-select" ref="addressId">
                                        {this.state.addressList.map(address => {
                                            return (
                                                <option key={address.id} value={address.id}>{address.street}, {address.city}, {address.state} {address.zip_code}</option>
                                            )
                                        })}
                                    </select>
                                </Col>
                            </Form.Group>

                            <Button onClick={this.handleAddItem}>Submit</Button>
                            <Button onClick={() => this.props.history.push('/inventory')}>Cancel</Button>
                            <Button className="item-detail-btn" onClick={this.renderAddAddress}>Add Address</Button>
                            <Button className="item-detail-btn" onClick={this.renderAddItemType}>Add Item Type</Button>
                        </Form>
                    </>
                )
        }
    }

    render() {
        return (
            <>
                {this.view(this.state.mode)}
            </>
        )
    }
}

export default AddItemForm