import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { register } from '../utility/simpleAuth'

class Register extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        role_id: 1,
        userName: "",
        password: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegister = event => {
        event.preventDefault()

        const newUser = {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.email,
            "username": this.state.userName,
            "password": this.state.password,
            "role_id": this.state.role_id
        }

        register(newUser, this.state.role_id)
            .then(() => {
                this.props.refreshNavbar()
                this.props.history.push("/inventory")
            })
    }


    // I need to setup a select menu and fetch for employee role
    render() {
        return (
            <>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <input id="firstName" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <input id="lastName" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <input id="email" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Role</Form.Label>
                        <input id="role_id" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <input id="userName" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <input id="password" type="password" onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button onClick={this.handleRegister} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
}

export default Register