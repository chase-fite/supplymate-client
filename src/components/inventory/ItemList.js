import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'


class ItemList extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        apiManager.get('items')
            .then(items => this.setState({ items: items }))
    }

    renderItemDetail = (id) => {
        this.props.history.push(`/inventory/${id}`)
    }

    renderAddItemForm = () => {
        this.props.history.push(`/inventory/addItem`)
    }

    render() {
        return (
            <>
                <h2 className="inv-title">Inventory</h2>
                <Button className="inv-add-item-button" onClick={this.renderAddItemForm}>Add Item</Button>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Qty</th>
                            <th>Name</th>
                            {/* <th>Type</th>
                            <th>Description</th> */}
                            <th>SN</th>
                            <th>Price</th>
                            <th>Storage Loc.</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map(item => {
                            return (
                                <tr key={item.id} onClick={() => this.renderItemDetail(item.id)}>
                                    <td>{item.stock}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.name}</td>
                                    {/* <td>Item Type Placeholder</td>
                                    <td>{item.description}</td> */}
                                    <td>{item.serial_number}</td>
                                    <td>{item.price}</td>
                                    <td>{item.storage_location}</td>
                                    <td>301 Address Placeholder, Nashville, TN 37216</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>




                {/* <h2 className="inventory-title">Inventory</h2>
                <div className="inventory-item-container">
                    <div>Stock</div>
                    <div>Qty</div>
                    <div>Name</div>
                    <div>Type</div>
                    <div>Description</div>
                    <div>SN</div>
                    <div>Price</div>
                    <div>Storage Loc.</div>
                    <div>Address</div>
                </div>
                <hr/>
                {this.state.items.map(item => {
                    return (
                        <>
                            <div className="inventory-item-container">
                                <div>{item.stock}</div>
                                <div>{item.quantity}</div>
                                <div>{item.name}</div>
                                <div>type</div>
                                <div>{item.description}</div>
                                <div>{item.serial_number}</div>
                                <div>{item.price}</div>
                                <div>{item.storage_location}</div>
                                <div>address</div>
                            </div>
                            <hr/>
                        </>
                    )
                })} */}
            </>
        )
    }
}

export default ItemList