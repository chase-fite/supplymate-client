import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
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

            // console.log('supplyRequest: ', supplyRequest)

            apiManager.get(`supplyrequestitems?sr_id=${this.props.match.params.supplyRequestId}`)
            .then(supplyRequestItems => {

                // console.log('supplyRequestItems: ', supplyRequestItems)

                // we want to take the requested_quantity property from the supplyrequestitem object and
                // add that to each item in our items list in state so that we can display it in the table
                const updatedItemList = []
                supplyRequest.items.forEach(item => {
                    for(let i = 0; i < supplyRequestItems.length; i++) {
                        if(item.id === supplyRequestItems[i].item.id) {
                            const updatedItem = item
                            updatedItem['requested_quantity'] = supplyRequestItems[i].requested_quantity
                            updatedItemList.push(updatedItem)
                            break
                        }
                    }
                })

                this.setState({
                    supplyRequest: supplyRequest,
                    items: updatedItemList,
                    delivery_date_time: supplyRequest.delivery_date_time,
                    address: supplyRequest.address,
                    status: supplyRequest.status,
                    user: supplyRequest.employee.user
                })
            })
        })
    }

    renderItemDetail = (id) => {
        this.props.history.push(`/inventory/${id}`)
    }

    render() {
        // console.log('srd state: ', this.state)
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
                            <th>Qty.</th>
                            <th>R.Q.</th>
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
                                    <td>{item.quantity}</td>
                                    <td>{item.requested_quantity}</td>
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