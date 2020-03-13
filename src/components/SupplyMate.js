import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'
import NavBar from './nav/NavBar'

class SupplyMate extends Component {

    render() {
        return (
            <>
                <NavBar />
                <ApplicationViews />
                
            </>
        )
    }
}

export default SupplyMate