import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import apiManager from '../utility/apiManager'


class CreateSupplyRequestForm extends Component {

    // need to implement address drop down and address manager button
    // also need to figure out how I'm going to generate the supply request

    state = {
        user: {},
        addressList: [],
        items: [],
        addedItems: []
    }

    componentDidMount() {
        apiManager.get('items')
            .then(items => {
                apiManager.get('addresses')
                    .then(addresses => {
                        this.setState({
                            items: items,
                            user: JSON.parse(sessionStorage.getItem('user')),
                            addressList: addresses
                        })
                    })
            })
    }

    renderItemDetail = (id) => {
        this.props.history.push(`/inventory/${id}`)
    }

    addItems = () => {
        let tempAddedItemsList = []
        for(let i = 0; i < this.state.items.length; i++) {
            let modifiedItemObject = this.state.items[i]
            modifiedItemObject['requested_quantity'] = Number(this.refs[i].value)
            if(Number(this.refs[i].value) !== 0 && !isNaN(Number(this.refs[i].value))) {
                tempAddedItemsList.push(modifiedItemObject)
            } else if(isNaN(Number(this.refs[i].value))) {
                window.alert('Please input a number for requested quantity')
                tempAddedItemsList = []
                break
            }
        }

        // console.log('temp added items list: ', tempAddedItemsList)
        this.setState({
            addedItems: tempAddedItemsList
        })
    }

    clearAddedItems = () => {
        this.setState({
            addedItems: []
        })
    }

    submitSupplyRequest = () => {
        // console.log("datetime: ", this.refs['date'].value, this.refs['time'].value)
        const date = this.refs['date'].value
        const month = Number(date.split('-')[0])
        const day = Number(date.split('-')[1])
        const year = Number(date.split('-')[2])
        const time = this.refs['time'].value
        const hour = Number(time.split(':')[0])
        const minute = Number(time.split(':')[1])
        const newDate = new Date(month, day, year, hour, minute, 0, 0)
        console.log('new date: ', newDate)

        const user = JSON.parse(sessionStorage.getItem('user'))
        const newSupplyRequest = {
            employee_id: user.employee_id,
            address_id: this.refs['address'].value,
            delivery_date_time: newDate,
            status_id: 2,
        }

        apiManager.post('supplyrequests', newSupplyRequest)
        .then(response => {
            console.log('response from post: ', response)

            const promiseArray = []
            this.state.addedItems.forEach(item => {
                console.log('item: ', item)
                const newSupplyRequestItemObject = {
                    supply_request_id: response.id,
                    item_id: item.id,
                    requested_quantity: item.requested_quantity
                }
                promiseArray.push(apiManager.post('supplyrequestitems', newSupplyRequestItemObject))
            })
            Promise.all(promiseArray)
        })
    }

    render() {
        return (
            <>
                <h2 className="inv-title">New Supply Request</h2>
                <div className="flex sr-details">
                    <div className="sr-input-label">Requester: {this.state.user.first_name} {this.state.user.last_name}</div>
                    <div className="flex">
                        <div className="sr-input-label">Delivery Date</div>
                        <input ref="date" type="date"></input>
                    </div>
                    <div className="flex">
                        <div className="sr-input-label">Delivery Time</div>
                        <input ref="time" type="time"></input>
                    </div>
                </div>
                <div className="flex sr-address-input-container">
                        <div className="sr-input-label">Address</div>
                        <select ref="address">
                            {this.state.addressList.map(address => {
                                return (
                                    <option key={address.id} value={address.id}>{address.street}, {address.city}, {address.state} {address.zip_code}</option>
                                )
                            })}
                        </select>
                    </div>

                <div className="csr-added-items-list">
                    {this.state.addedItems.map((item, indx) => {
                        return (
                            <div key={indx}>{item.requested_quantity} x {item.name}</div>
                        )
                    })}
                </div>
                <Button onClick={this.submitSupplyRequest}>Submit</Button>
                <Button>Manage Addresses</Button>
                <Button onClick={this.clearAddedItems}>Clear Added Items</Button>

                <h2 className="inv-title">Inventory</h2>
                <Button onClick={this.addItems}>Add Items</Button>

                <div className="sr-add-item-container">
                    <div className="sr-add-button-input">
                        <div className="sr-table-header">
                            <div>RQ</div>
                        </div>
                        {
                            this.state.items.map((item, indx) => {
                                return (
                                    <input key={indx} ref={indx} className="sr-add-item-input" type="text" />
                                )
                            })
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
                                        <td>{item.address.street}, {item.address.city}, {item.address.state} {item.address.zip_code}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}

export default CreateSupplyRequestForm