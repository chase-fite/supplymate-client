import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { login } from '../utility/simpleAuth'


class Login extends Component {

    handleLogin = (evt) => {
        evt.preventDefault()

        const credentials = {
            "username": this.refs.username.value,
            "password": this.refs.password.value
        }

        login(credentials)
            .then(() => {
                this.props.refreshNavbar()
                this.props.history.push("/inventory")
            })
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref="username" type="text" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref="password" type="password" />
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