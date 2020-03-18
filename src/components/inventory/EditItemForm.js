import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'
import deloImage from '../../images/delo-400.jpeg'


class EditItemForm extends Component {

    state = {
        stock: "",
        quantity: "",
        name: "",
        typeId: "",
        description: "",
        serialNumber: "",
        price: "",
        storageLocation: "",
        addressId: ""
    }

    componentDidMount() {
        apiManager.getOne('items', this.props.match.params.itemId)
        .then(item => {
            this.setState({
                stock: item.stock,
                quantity: item.quantity,
                name: item.name,
                typeId: item.item_type_id,
                description: item.description,
                serialNumber: item.serial_number,
                price: item.price,
                storageLocation: item.storage_location,
                addressId: item.address_id
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
            item_type_id: parseInt(this.refs.type.value),
            description: this.refs.description.value,
            serial_number: this.refs.serialNumber.value,
            price: parseInt(this.refs.price.value),
            storage_location: this.refs.storageLocation.value,
            address_id: parseInt(this.refs.address.value)
        }

        apiManager.update('items', newItem, this.props.match.params.itemId)
        .then(r => this.props.history.push('/inventory'))
    }

    render() {
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
                        <Col sm="10">
                            <Form.Control type="text" ref="name" defaultValue={this.state.name} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Stock
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="stock" defaultValue={this.state.stock} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Quantity
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="quantity" defaultValue={this.state.quantity} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Type (id for now)
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="type" defaultValue={this.state.typeId} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="description" defaultValue={this.state.description} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Serial Number
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="serialNumber" defaultValue={this.state.serialNumber} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Price
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="price" defaultValue={this.state.price} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Storage Location
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="storageLocation" defaultValue={this.state.storageLocation} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Address (id for now)
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="address" defaultValue={this.state.addressId} />
                        </Col>
                    </Form.Group>

                    <Button onClick={this.handleUpdateItem}>Submit</Button>
                </Form>
            </>
        )
    }
}

export default EditItemForm