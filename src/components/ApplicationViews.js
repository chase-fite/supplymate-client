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
                        return <Login />
                    }}
                />
                <Route
                    exact path="/register" render={props => {
                        return <Register />
                    }}
                />
            </>
        )
    }
}

export default ApplicationViews