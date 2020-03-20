import React, { Component } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
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
                        <Col sm="6">
                            <Form.Control ref="username" type="text" />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Col sm="6">
                            <Form.Control ref="password" type="password" />
                        </Col>
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