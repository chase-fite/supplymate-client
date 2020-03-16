import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'
import NavBar from './nav/NavBar'

class SupplyMate extends Component {

    state = {
        loggedIn: false
    }
    
    refreshNavbar = () => {
        this.setState({
            loggedIn: true
        })
    }

    render() {
        return (
            <>
                <NavBar />
                <ApplicationViews refreshNavbar={this.refreshNavbar} />
                
            </>
        )
    }
}

export default SupplyMate