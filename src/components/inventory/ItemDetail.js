import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'


class ItemDetail extends Component {

    state = {
        stock: 0,
        quantity: 0,
        name: "",
        typeId: 0,
        description: "",
        serialNumber: "",
        price: 0,
        storageLocation: "",
        addressId: 0
    }

    // **item format in the fetch**
    // id: 1
    // url: "http://localhost:8000/items/1"
    // name: "Delo 400"
    // description: "Delo 400 SDE SAE 15W-40"
    // serial_number: "232983487"
    // stock: 27
    // quantity: 22
    // item_type_id: 1
    // address_id: 1
    // storage_location: "Aisle 5, Shelf 1"
    // price: "225.00"

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

    render() {
        return (
            <>
                <div className="flex">
                    <div>
                        <img src={`../../assets/delo-400.jpeg`} alt="delo 400" />
                    </div>
                    <div className="flex">
                        <Button className="item-detail-btn">Edit Item</Button>
                        <Button className="item-detail-btn">Delete Item</Button>
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
                            <td>{this.state.typeId}</td>
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
                            <td>{this.state.price}</td>
                        </tr>
                        <tr>
                            <td>Storage Location</td>
                            <td>{this.state.storageLocation}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{this.state.addressId}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}

export default ItemDetail