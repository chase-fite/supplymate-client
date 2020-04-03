import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import { isAuthenticated, logout } from '../utility/simpleAuth'
import './NavBar.css'

class NavBar extends Component {

    // state = {
    //     loggedIn: false
    // }

    render() {
        return (
            <>
                <Navbar sticky="top" variant="dark" className="navbar">
                    <Nav>
                        {(isAuthenticated())
                            ?
                            <>
                                <Nav.Link href="/inventory">Inventory</Nav.Link>
                                <NavDropdown title="Supply Requests" id="nav-dropdown">
                                    <NavDropdown.Item href="/supplyrequests/pending">Pending</NavDropdown.Item>
                                    <NavDropdown.Item href="/supplyrequests/approved">Approved</NavDropdown.Item>
                                    <NavDropdown.Item href="/supplyrequests/complete">Complete</NavDropdown.Item>
                                    {
                                        (JSON.parse(sessionStorage.getItem('user')).role === "Remote")
                                        ?
                                        <NavDropdown.Item href="/supplyrequests/create">Create New</NavDropdown.Item>
                                        :
                                        <></>
                                    }
                                </NavDropdown>
                                <Nav.Link onClick={logout} href="/login">Logout</Nav.Link>
                            </>
                            :
                            <Nav.Link href="/login">Login</Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        <div className="nav-title">SupplyMate</div>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button className="nav-search-btn" variant="outline-light">Search</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default NavBar