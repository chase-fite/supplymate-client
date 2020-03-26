import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ItemList from './inventory/ItemList'
import ItemDetail from './inventory/ItemDetail'
import AddItemForm from './inventory/AddItemForm'
import EditItemForm from './inventory/EditItemForm'
import SupplyRequests from './supplyRequests/SupplyRequests'
import CreateSupplyRequestForm from './supplyRequests/CreateSupplyRequestForm'

class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route
                    exact path="/login" render={props => {
                        return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                    }}
                />
                <Route
                    exact path="/register" render={props => {
                        return <Register refreshNavbar={this.props.refreshNavbar} {...props} />
                    }}
                />
                <Route
                    exact path="/inventory" render={props => {
                        return <ItemList {...props} />
                    }}
                />
                <Route
                    exact path="/inventory/:itemId(\d+)" render={props => {
                        return <ItemDetail {...props} />
                    }}
                />
                <Route
                    exact path="/inventory/addItem" render={props => {
                        return <AddItemForm {...props} />
                    }}
                />
                <Route
                    exact path="/inventory/editItem/:itemId(\d+)" render={props => {
                        return <EditItemForm {...props} />
                    }}
                />
                <Route
                    exact path="/supplyrequests" render={props => {
                        return <SupplyRequests {...props} />
                    }}
                />
                <Route
                    exact path="/supplyrequests/create" render={props => {
                        return <CreateSupplyRequestForm {...props} />
                    }}
                />
            </>
        )
    }
}

export default ApplicationViews