import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import apiManager from '../utility/apiManager'
import './SupplyRequests.css'
import { formatDateTime } from '../utility/dateTime'


class SupplyRequestDetail extends Component {

    state = {
        supplyRequest: {},
        delivery_date_time: "",
        address: {},
        status: "",
        items: [],
        user: {}
    }

    componentDidMount() {
        apiManager.getOne('supplyrequests', this.props.match.params.supplyRequestId)
            .then(supplyRequest => {
                // console.log('supply request fetch: ', supplyRequest)
                this.setState({
                    supplyRequest: supplyRequest,
                    items: supplyRequest.items,
                    delivery_date_time: supplyRequest.delivery_date_time,
                    address: supplyRequest.address,
                    status: supplyRequest.status,
                    user: JSON.parse(sessionStorage.getItem('user'))
                })
            })
    }

    renderItemDetail = (id) => {
        this.props.history.push(`/inventory/${id}`)
    }

    render() {
        console.log('state: ', this.state)
        return (
            <>
                <h2 className="inv-title">Supply Request Details</h2>
                
                <div className="srd-card-header">
                    {
                        (this.state.delivery_date_time === "")
                        ?
                        <></>
                        :
                        <>
                            <div className="flex srd-header">
                                <div>Requester: {this.state.user.first_name} {this.state.user.last_name}</div>
                                <div>Deliver By: {formatDateTime(this.state.delivery_date_time)}</div>
                                <div>Status: {this.state.status.name}</div>
                            </div>
                            <div className="srd-header-address">Address: {this.state.address.street}, {this.state.address.city}, {this.state.address.state} {this.state.address.zip_code}</div>
                        </>
                    }
                </div>
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

export default SupplyRequestDetail