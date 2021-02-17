import React, { Component } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { register } from '../utility/simpleAuth'
import './Login.css'


class Register extends Component {

    handleRegister = event => {
        event.preventDefault()

        const newUser = {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "username": this.refs.userName.value,
            "password": this.refs.password.value,
            "role_id": Number(this.refs.roleId.value)
        }

        console.log('newUser: ', newUser);

        register(newUser, Number(this.refs.roleId.value))
            .then(() => {
                this.props.refreshNavbar()
                this.props.updateAVState()
                this.props.history.push("/login")
            })
    }

    // I need to setup a select menu and fetch for employee role
    render() {
        return (
            <>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Col sm="6">
                            <Form.Control ref="firstName" type="text" onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Col sm="6">
                            <Form.Control ref="lastName" type="text" onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Col sm="6">
                            <Form.Control ref="email" type="text" onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Col sm="6">
                            <select className="role-select" ref="roleId">
                                <option value={1}>Logistics</option>
                                <option value={2}>Remote</option>
                            </select>
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Col sm="6">
                            <Form.Control ref="userName" type="text" onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Col sm="6">
                            <Form.Control ref="password" type="password" onChange={this.handleInputChange} />
                        </Col>
                    </Form.Group>
                    
                    <Button className="login-btn" onClick={this.handleRegister} type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
}

export default Register