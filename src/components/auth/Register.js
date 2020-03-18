import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { register } from '../utility/simpleAuth'


class Register extends Component {

    handleRegister = event => {
        event.preventDefault()

        const newUser = {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "username": this.refs.userName.value,
            "password": this.refs.password.value,
            "role_id": this.refs.roleId.value
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
                        <Form.Control ref="firstName" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control ref="lastName" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control ref="email" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Role</Form.Label>
                        <Form.Control ref="roleId" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref="userName" type="text" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref="password" type="password" onChange={this.handleInputChange} />
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