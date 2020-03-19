import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'
import deloImage from '../../images/delo-400.jpeg'
import ManageAddresses from './ManageAddresses'
import ManageItemTypes from './ManageItemTypes'


class EditItemForm extends Component {

    state = {
        id: 0,
        stock: "",
        quantity: "",
        name: "",
        typeId: "",
        description: "",
        serialNumber: "",
        price: "",
        storageLocation: "",
        addressId: "",
        addressList: [],
        itemTypeList: [],
        mode: ""
    }

    componentDidMount() {
        apiManager.getOne('items', this.props.match.params.itemId)
            .then(item => {
                apiManager.get('addresses')
                    .then(addresses => {
                        apiManager.get('itemtypes')
                            .then(itemTypes => {
                                this.setState({
                                    id: item.id,
                                    stock: item.stock,
                                    quantity: item.quantity,
                                    name: item.name,
                                    itemTypeId: item.item_type_id,
                                    description: item.description,
                                    serialNumber: item.serial_number,
                                    price: item.price,
                                    storageLocation: item.storage_location,
                                    addressId: item.address_id,
                                    addressList: addresses,
                                    itemTypeList: itemTypes
                                })
                            })
                    })
            })

    }

    handleUpdateItem = () => {
        // I need to check if item type already exists and if it doesn't then i need to create a new one
        // I need to do the same thing with address

        const newItem = {
            stock: parseInt(this.refs.stock.value),
            quantity: parseInt(this.refs.quantity.value),
            name: this.refs.name.value,
            item_type_id: parseInt(this.refs.itemTypeId.value),
            description: this.refs.description.value,
            serial_number: this.refs.serialNumber.value,
            price: parseInt(this.refs.price.value),
            storage_location: this.refs.storageLocation.value,
            address_id: parseInt(this.refs.addressId.value)
        }

        apiManager.update('items', newItem, this.props.match.params.itemId)
            .then(r => this.props.history.push(`/inventory/${this.props.match.params.itemId}`))
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

    returnToEditItem = () => {
        this.setState({
            mode: ''
        })
    }

    view = (mode) => {
        switch (mode) {
            case 'addAddress':
                return <ManageAddresses returnToEditItem={this.returnToEditItem} />
            case 'addItemType':
                return <ManageItemTypes returnToEditItem={this.returnToEditItem} />
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
                                    <Form.Control className="no-highlight" type="text" ref="name" defaultValue={this.state.name} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Stock
                            </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="stock" defaultValue={this.state.stock} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Quantity
                            </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="quantity" defaultValue={this.state.quantity} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Type
                            </Form.Label>
                                <Col sm="6">
                                    <select defaultValue={this.state.itemTypeId} className="address-select" ref="itemTypeId">
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
                                    <Form.Control type="text" ref="description" defaultValue={this.state.description} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Serial Number
                            </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="serialNumber" defaultValue={this.state.serialNumber} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Price
                            </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="price" defaultValue={this.state.price} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Storage Location
                            </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" ref="storageLocation" defaultValue={this.state.storageLocation} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Address
                            </Form.Label>
                                <Col sm="6">
                                    <select defaultValue={this.state.addressId} className="address-select" ref="addressId">
                                        {this.state.addressList.map(address => {
                                            return (
                                                <option key={address.id} value={address.id}>{address.street}, {address.city}, {address.state} {address.zip_code}</option>
                                            )
                                        })}
                                    </select>
                                </Col>
                            </Form.Group>

                            <Button className="item-detail-btn" onClick={this.handleUpdateItem}>Save</Button>
                            <Button className="item-detail-btn" onClick={this.renderAddAddress}>Manage Addresses</Button>
                            <Button className="item-detail-btn" onClick={this.renderAddItemType}>Manage Item Types</Button>
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

export default EditItemForm