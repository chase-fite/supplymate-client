import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'

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
            </>
        )
    }
}

export default ApplicationViews