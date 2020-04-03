import React, { Component } from 'react'
import './SupplyRequests.css'
import apiManager from '../utility/apiManager'
import SupplyRequestCard from './SupplyRequestCard'


class SupplyRequests extends Component {

    state = {
        supplyRequests: []
    }

    componentDidMount() {
        switch (this.props.mode) {
            case "Pending":
                return (
                    apiManager.get('supplyrequests?status=pending')
                    .then(supplyRequests => {
                        this.setState({
                            supplyRequests: supplyRequests
                        })
                    })
                )
            case "Approved":
                return (
                    apiManager.get('supplyrequests?status=approved')
                    .then(supplyRequests => {
                        this.setState({
                            supplyRequests: supplyRequests
                        })
                    })
                )
            case "Complete":
                return (
                    apiManager.get('supplyrequests?status=complete')
                    .then(supplyRequests => {
                        this.setState({
                            supplyRequests: supplyRequests
                        })
                    })
                )
            default:
                return <></>
        }
    }

    deleteSupplyRequest = (id, itemList) => {

        this.state.supplyRequests.forEach(sr => {
            if(sr.id === id) {
                const promiseArray = []

                sr.items.forEach((item, indx) => {
                    // console.log('item: ', item)
                    // console.log('itemList item: ', itemList[indx])
                    
                    const updatedItem = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        serial_number: item.serial_number,
                        stock: item.stock,
                        quantity: (Number(item.quantity) + Number(itemList[indx].requested_quantity)),
                        item_type_id: item.item_type.id,
                        address_id: item.address.id,
                        storage_location: item.storage_location,
                        price: item.price
                    }
                    promiseArray.push(apiManager.update('items', updatedItem, item.id))
                })
                Promise.all(promiseArray)
            }
        })

        apiManager.delete('supplyrequests', id)
        .then(response => {
            let updatedSupplyRequestList = []
            updatedSupplyRequestList = this.state.supplyRequests.filter(sr => {
                return sr.id !== id
            })
            this.setState({
                supplyRequests: updatedSupplyRequestList
            })
        })
    }

    changeSupplyRequestStatus = (id, statusId) => {

        let updatedSupplyRequest = {}
        this.state.supplyRequests.forEach(sr => {
            if(sr.id === id) {
                updatedSupplyRequest = {
                    id: id,
                    employee_id: sr.employee.id,
                    address_id: sr.address.id,
                    delivery_date_time: sr.delivery_date_time,
                    items: sr.items,
                    status_id: statusId,
                }
            }
        })

        apiManager.update('supplyrequests', updatedSupplyRequest, id)
            .then(response => {
                let updatedSupplyRequestList = []
                updatedSupplyRequestList = this.state.supplyRequests.filter(sr =>{
                    return sr.id !== id
                })
                this.setState({
                    supplyRequests: updatedSupplyRequestList
                })
            })
    }

    display = () => {
        switch (this.props.mode) {
            case 'Pending':
                return (
                    <div className="sr-container">
                        <h2 className="sr-title">Pending Supply Requests</h2>
                        {this.state.supplyRequests.map((supplyRequest, indx) => {
                            return (
                                <SupplyRequestCard
                                    key={indx}
                                    supplyRequest={supplyRequest}
                                    history={this.props.history}
                                    deleteSupplyRequest={this.deleteSupplyRequest}
                                    changeSupplyRequestStatus={this.changeSupplyRequestStatus}
                                />
                            )
                        })}
                    </div>
                )
            case 'Approved':
                return (
                    <div className="sr-container">
                        <h2 className="sr-title">Approved Supply Requests</h2>
                        {this.state.supplyRequests.map((supplyRequest, indx) => {
                            return (
                                <SupplyRequestCard
                                    key={indx}
                                    supplyRequest={supplyRequest}
                                    history={this.props.history}
                                    deleteSupplyRequest={this.deleteSupplyRequest}
                                    changeSupplyRequestStatus={this.changeSupplyRequestStatus}
                                />
                            )
                        })}
                    </div>
                )
            case 'Complete':
                return (
                    <div className="sr-container">
                        <h2 className="sr-title">Complete Supply Requests</h2>
                        {this.state.supplyRequests.map((supplyRequest, indx) => {
                            return (
                                <SupplyRequestCard
                                    key={indx}
                                    supplyRequest={supplyRequest}
                                    history={this.props.history}
                                />
                            )
                        })}
                    </div>
                )
            default:
                return <></>
        }
    }

    render() {
        return (
            <>
                {this.display()}
            </>
        )
    }
}

export default SupplyRequests