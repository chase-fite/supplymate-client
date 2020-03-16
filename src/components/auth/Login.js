import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { login } from '../utility/simpleAuth'

class Login extends Component {

    state = {
        userName: "",
        password: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (evt) => {
        evt.preventDefault()

        const credentials = {
            "username": this.state.userName,
            "password": this.state.password
        }

        login(credentials)
            .then(() => {
                this.props.refreshNavbar()
                this.props.history.push("/")
            })
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control id="userName" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="password" type="password" onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button onClick={this.handleLogin} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <a href="/register">Register a new account</a>
            </>
        )
    }
}

export default Login