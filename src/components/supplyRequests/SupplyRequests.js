import React, { Component } from 'react'
import './SupplyRequests.css'
import apiManager from '../utility/apiManager'
import SupplyRequestCard from './SupplyRequestCard'
import { Button } from 'react-bootstrap'


class SupplyRequests extends Component {

    state = {
        supplyRequests: []
    }

    componentDidMount() {
        apiManager.get('supplyrequests?status=pending')
        .then(supplyrequests => {
            // console.log('supply requests: ', supplyrequests)
            this.setState({
                supplyRequests: supplyrequests
            })
        })
    }

    renderSupplyRequestDetails = () => {
        this.props.history.push('/inventory')
    }

    renderCreateSupplyRequestForm = () => {
        this.props.history.push('/supplyrequests/create')
    }

    render() {
        return (
            <div className="sr-container">
                <h2 className="sr-title">Pending Supply Requests</h2>
                <Button onClick={this.renderCreateSupplyRequestForm}>Create Supply Request</Button>

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
    }
}

export default SupplyRequests