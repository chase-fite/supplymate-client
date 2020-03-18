import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ItemList from './inventory/ItemList'

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
            </>
        )
    }
}

export default ApplicationViews