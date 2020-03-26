import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import deloImage from '../../images/delo-400.jpeg'
import './Inventory.css'


class ItemDetail extends Component {

    state = {
        stock: 0,
        quantity: 0,
        name: "",
        type: 0,
        description: "",
        serialNumber: "",
        price: 0,
        storageLocation: "",
        address: 0
    }

    componentDidMount() {
        apiManager.getOne('items', this.props.match.params.itemId)
            .then(item => {
                this.setState({
                    stock: item.stock,
                    quantity: item.quantity,
                    name: item.name,
                    type: item.item_type,
                    description: item.description,
                    serialNumber: item.serial_number,
                    price: item.price,
                    storageLocation: item.storage_location,
                    address: item.address
                })
            })
    }

    renderEditItem = (id) => {
        this.props.history.push(`/inventory/editItem/${id}`)
    }

    handleDeleteItem = (id) => {
        apiManager.delete('items', id)
            .then(r => this.props.history.push('/inventory'))
    }

    render() {
        return (
            <>
                <div className="flex">
                    <div>
                        <img className="image" src={deloImage} alt="delo 400" />
                    </div>
                    <div className="flex item-detail-btn-container">
                        {
                            (JSON.parse(sessionStorage.getItem('user')).role === "Logistics")
                            ?
                            <>
                                <Button className="item-detail-btn" onClick={() => this.renderEditItem(this.props.match.params.itemId)}>Edit Item</Button>
                                <Button className="item-detail-btn" onClick={() => this.handleDeleteItem(this.props.match.params.itemId)}>Delete Item</Button>
                            </>
                            :
                            <></>
                        }
                    </div>
                </div>

                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr>
                            <td>Stock</td>
                            <td>{this.state.stock}</td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>{this.state.quantity}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{this.state.type.name}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{this.state.description}</td>
                        </tr>
                        <tr>
                            <td>Serial Number</td>
                            <td>{this.state.serialNumber}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>${this.state.price}</td>
                        </tr>
                        <tr>
                            <td>Storage Location</td>
                            <td>{this.state.storageLocation}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{this.state.address.street}, {this.state.address.city}, {this.state.address.state} {this.state.address.zip_code}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}

export default ItemDetail