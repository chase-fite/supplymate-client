import React, { Component } from 'react'
import './SupplyRequests.css'
import apiManager from '../utility/apiManager'
import SupplyRequestCard from './SupplyRequestCard'
import { Button } from 'react-bootstrap'


class SupplyRequests extends Component {

    state = {
        supplyRequests: [],
        user: {}
    }

    componentDidMount() {
        apiManager.get('supplyrequests?status=pending')
        .then(supplyrequests => {
            // console.log('supply requests: ', supplyrequests)
            this.setState({
                supplyRequests: supplyrequests,
                user: JSON.parse(sessionStorage.getItem('user'))
            })
        })
    }

    renderSupplyRequestDetails = () => {
        this.props.history.push('/inventory')
    }

    renderCreateSupplyRequestForm = () => {
        this.props.history.push('/supplyrequests/create')
    }

    deleteSupplyRequest = (id) => {
        apiManager.delete('supplyrequests', id)
        .then(response => {
            let newSupplyRequestList = []
            newSupplyRequestList = this.state.supplyRequests.filter(sr => {
                return sr.id !== id
            })
            this.setState({
                supplyRequests: newSupplyRequestList
            })
        })
    }

    render() {
        return (
            <div className="sr-container">
                <h2 className="sr-title">Pending Supply Requests</h2>
                {
                    (JSON.parse(sessionStorage.getItem('user')).role === "Remote")
                    ?
                    <Button onClick={this.renderCreateSupplyRequestForm}>Create Supply Request</Button>
                    :
                    <></>
                }
                

                {this.state.supplyRequests.map((supplyRequest, indx) => {
                    return (
                        <SupplyRequestCard
                            key={indx}
                            supplyRequest={supplyRequest}
                            history={this.props.history}
                            deleteSupplyRequest={this.deleteSupplyRequest}
                        />
                    )
                })}
            </div>
        )
    }
}

export default SupplyRequests