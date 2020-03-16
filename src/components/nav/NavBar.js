import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { isAuthenticated, logout } from '../utility/simpleAuth'

class NavBar extends Component {

    render() {
        return (
            <>
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto">
                        {(isAuthenticated())
                            ?
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                            :
                            <Nav.Link href="/login">Login</Nav.Link>
                        }
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default NavBar