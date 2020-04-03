import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './Inventory.css'


class ItemList extends Component {

    state = {
        items: [],
        user: {}
    }

    componentDidMount() {
        apiManager.get('items')
            .then(items => {
                this.setState({
                    items: items,
                    user: JSON.parse(sessionStorage.getItem('user'))
                })
            })
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
                {
                    (this.state.user.role === "Logistics")
                    ?
                    <Button className="inv-add-item-button" onClick={this.renderAddItemForm}>Add Item</Button>
                    :
                    <></>
                }
                <div className="csr-rq-legend">Stock = Desired quantity on restock</div>
                <div className="csr-rq-legend">Qty. = Quantity of items on hand</div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Qty</th>
                            <th>Name</th>
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
                                    <td>{item.serial_number}</td>
                                    <td>${item.price}</td>
                                    <td>{item.storage_location}</td>
                                    <td>{item.address.street}, {item.address.city}, {item.address.state} {item.address.zip_code}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default ItemList