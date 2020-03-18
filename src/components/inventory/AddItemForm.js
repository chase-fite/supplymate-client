import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'
import deloImage from '../../images/delo-400.jpeg'


class AddItemForm extends Component {

    handleAddItem = () => {
        // I need to check if item type already exists and if it doesn't then i need to create a new one
        // I need to do the same thing with address

        const newItem = {
            stock: this.refs.stock.value,
            quantity: this.refs.quantity.value,
            name: this.refs.name.value,
            item_type_id: this.refs.type.value,
            description: this.refs.description.value,
            serial_number: this.refs.serialNumber.value,
            price: this.refs.price.value,
            storage_location: this.refs.storageLocation.value,
            address_id: this.refs.address.value
        }

        apiManager.post('items', newItem)
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
                            <Form.Control type="text" ref="name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Stock
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="stock" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Quantity
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="quantity" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Type (id for now)
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="type" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="description" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Serial Number
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="serialNumber" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Price
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="price" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Storage Location
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="storageLocation" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Address (id for now)
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" ref="address" />
                        </Col>
                    </Form.Group>

                    <Button onClick={this.handleAddItem}>Submit</Button>
                </Form>
            </>
        )
    }
}

export default AddItemForm