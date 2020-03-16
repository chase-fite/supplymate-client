import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { register } from '../utility/simpleAuth'

class Register extends Component {

    state = {
        email: "",
        userName: "",
        lastName: "",
        password: "",
        firstName: "",
        verifyPassword: ""
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
            "password": this.state.password
        }

        register(newUser)
            .then(() => {
                this.props.getProductTypesForNav()
                this.props.history.push("/")
            })
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control id="firstName" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control id="lastName" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control id="email" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control id="userName" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="password" onChange={this.handleInputChange} />
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