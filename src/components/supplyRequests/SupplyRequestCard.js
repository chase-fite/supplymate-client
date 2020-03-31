import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import './SupplyRequests.css'
import apiManager from '../utility/apiManager'
import { formatDateTime } from '../utility/dateTime'


class SupplyRequestCard extends Component {

    state = {
        items: [],
        itemCols: [],
        supplyRequest: {}
    }

    componentDidMount() {
        apiManager.get(`supplyrequestitems?sr_id=${this.props.supplyRequest.id}`)
            .then(supplyRequestItems => {
                // console.log('supply request items fetch: ', supplyRequestItems)

                let counter = 0
                let tempColList = []
                let tempItemList = []
                for (let i = 0; i < 20; i++) {
                    if (supplyRequestItems[i]) {
                        tempItemList.push(supplyRequestItems[i])
                        // console.log('temp item list: ', tempItemList)
                        counter++

                        if (counter === 5) {
                            counter = 0
                            tempColList.push(tempItemList)
                            // console.log('temp col list: ', tempColList)
                            tempItemList = []
                        }
                    } else {
                        tempColList.push(tempItemList)
                        // console.log('temp col list: ', tempColList)
                        tempItemList = []
                        break
                    }
                }
                // console.log('FINAL temp col list: ', tempColList)

                this.setState({
                    itemCols: tempColList,
                    items: supplyRequestItems,
                    supplyRequest: this.props.supplyRequest
                })
            })
    }

    renderSupplyRequestDetails = (id) => {
        this.props.history.push(`/supplyrequests/${id}`)
    }

    render() {
        return (
            <Card className="sr-card">
                <Card.Header className="sr-card-header" onClick={() => this.renderSupplyRequestDetails(this.state.supplyRequest.id)}>
                    <div className="src-header">
                        <div>Requester: {this.props.supplyRequest.employee.user.first_name} {this.props.supplyRequest.employee.user.last_name}</div>
                        <div>Deliver By: {formatDateTime(this.props.supplyRequest.delivery_date_time)}</div>
                        <div>Status: {this.props.supplyRequest.status.name}</div>
                    </div>
                    <div className="src-header-address">Address: {this.props.supplyRequest.address.street}, {this.props.supplyRequest.address.city}, {this.props.supplyRequest.address.state} {this.props.supplyRequest.address.zip_code}</div>
                </Card.Header>
                <Card.Body className="sr-card-body">
                    <div className="sr-click-notice" onClick={() => this.renderSupplyRequestDetails(this.state.supplyRequest.id)}>(Click for supply request details)</div>
                    <div className="sr-item-container" onClick={() => this.renderSupplyRequestDetails(this.state.supplyRequest.id)}>
                        {this.state.itemCols.map((col, indx) => {
                            return (
                                <div className="sr-item-col" key={indx}>

                                    {col.map((item, indx2) => {
                                        return (
                                            <div key={indx2} className="sr-item">{item.requested_quantity} x {item.item.name}</div>
                                        )
                                    })}

                                </div>
                            )
                        })}
                    </div>
                    <div className="sr-note-button">
                        <div className="sr-note-label">
                            <textarea className="sr-note" placeholder="Leave a note"></textarea>
                        </div>
                        <div className="sr-button">
                            <Button>Approve</Button>
                            {/* <Button>Modify</Button> */}
                            <Button onClick={() => this.props.deleteSupplyRequest(this.props.supplyRequest.id)}>Cancel</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default SupplyRequestCard