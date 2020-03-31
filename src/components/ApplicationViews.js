import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ItemList from './inventory/ItemList'
import ItemDetail from './inventory/ItemDetail'
import AddItemForm from './inventory/AddItemForm'
import EditItemForm from './inventory/EditItemForm'
import SupplyRequests from './supplyRequests/SupplyRequests'
import CreateSupplyRequestForm from './supplyRequests/CreateSupplyRequestForm'
import { isAuthenticated } from './utility/simpleAuth'
import SupplyRequestDetail from './supplyRequests/SupplyRequestDetail'


class ApplicationViews extends Component {

    state = {
        role: ""
    }

    componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('user'))
        // console.log("user: ", user)
        if(user !== null) {
            this.setState({
                role: user.role
            })
        }
    }

    updateAVState = () => {
        console.log('updateAVState ran')
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(user !== null) {
            this.setState({
                role: user.role
            })
        }
    }

    render() {
        return (
            <>
                {
                    (this.state.role === "")
                    ?
                    <>
                        <Route
                            exact path="/" render={props => {
                                return <Login refreshNavbar={this.props.refreshNavbar} updateAVState={this.updateAVState} {...props} />
                            }}
                        />
                        <Route
                            exact path="/login" render={props => {
                                return <Login refreshNavbar={this.props.refreshNavbar} updateAVState={this.updateAVState} {...props} />
                            }}
                        />
                        <Route
                            exact path="/register" render={props => {
                                return <Register refreshNavbar={this.props.refreshNavbar} {...props} />
                            }}
                        />
                    </>
                    :
                    <>
                        <Route
                            exact path="/inventory" render={props => {
                                if(isAuthenticated()) {
                                    return <ItemList {...props} />
                                } else {
                                    return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                                }
                            }}
                        />
                        <Route
                            exact path="/inventory/:itemId(\d+)" render={props => {
                                if(isAuthenticated()) {
                                    return <ItemDetail {...props} />
                                } else {
                                    return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                                }
                            }}
                        />
                        <Route
                            exact path="/inventory/addItem" render={props => {
                                if(isAuthenticated() && this.state.role === "Logistics") {
                                    return <AddItemForm {...props} />
                                } else if(isAuthenticated() && this.state.role === "Remote") {
                                    return <></>
                                } else {
                                    return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                                }
                            }}
                        />
                        <Route
                            exact path="/inventory/editItem/:itemId(\d+)" render={props => {
                                if(isAuthenticated() && this.state.role === "Logistics") {
                                    return <EditItemForm {...props} />
                                } else if(isAuthenticated() && this.state.role === "Remote") {
                                    return <></>
                                } else {
                                    return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                                }
                            }}
                        />
                        <Route
                            exact path="/supplyrequests" render={props => {
                                if(isAuthenticated()) {
                                    return <SupplyRequests {...props} />
                                } else {
                                    return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                                }
                            }}
                        />
                        <Route
                            exact path="/supplyrequests/:supplyRequestId(\d+)" render={props => {
                                if(isAuthenticated()) {
                                    return <SupplyRequestDetail {...props} />
                                } else {
                                    return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                                }
                            }}
                        />
                        <Route
                            exact path="/supplyrequests/create" render={props => {
                                if(isAuthenticated() && this.state.role === "Remote") {
                                    return <CreateSupplyRequestForm {...props} />
                                } else if(isAuthenticated() && this.state.role === "Logistics") {
                                    return <></>
                                } else {
                                    return <Login refreshNavbar={this.props.refreshNavbar} {...props} />
                                }
                            }}
                        />
                    </>
                }
            </>
        )
    }
}

export default withRouter(ApplicationViews)