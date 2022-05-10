import React, { useState } from 'react';
import { Button, Col, Form, Image, Modal, NavLink, Row } from 'react-bootstrap';
import loginImage from '../../assets/images/loginImage.jpg';
import { useNavigate } from "react-router-dom";
import AuthService from '../../services/Auth.service';
const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const Login = (props) => {
    let navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState({
        "emailId": "",
        "password": "",
        "role": ""
    })

    const openRegisterModal = () => {
        props.handleModal();
        props.openRegisterModal();
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if (name === "emailId")
            if (!emailExpresion.test(value))
                setValidated({ email: 'email is invalid' })
            else {
                delete validated.email;
            }
        if (name === "password")
            if (value.length < 6)
                setValidated({ pass: 'invalid' })
            else {
                delete validated.pass;
            }
        console.log(data, validated)
    }

    const submit = (event) => {
        event.preventDefault();

        // localStorage.setItem("jwt-token", 'token');
        // localStorage.setItem("role", data.role);
        // props.handleModal();
        // if (data.role === "doctor") {
        //     console.log("doctor logged in");
        //     navigate('/updatedoctor')
        // }
        // else if (data.role === "patient") {
        //     console.log("patient logged in");
        //     navigate('/updatepatient')
        // }

        setValidated(true)
        AuthService.login(data).then(res => {
            localStorage.setItem("userEmail", data.emailId);
            localStorage.setItem("jwt-token", res.data.token);
            localStorage.setItem("role", data.role);
            if (data.role === "doctor") {
                console.log("doctor logged in");
                navigate('/updatedoctor')
            }
            else if (data.role === "patient") {
                console.log("patient logged in");
                navigate('/updatepatient')
            }
            props.handleModal();

        }).catch(err => console.log(err))

    }

    return (
        <React.Fragment>
            <Modal size='lg' show={props.show} onHide={props.handleModal}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Modal.Title>Welcome to Digital Doctor</Modal.Title>
                    <Row className='d-flex'>
                        <Col md={5} xl={6} lg={6}>
                            <Image src={loginImage} className="loginImg" />
                        </Col>
                        <Col md={8} lg={7} xl={5} className="my-5">
                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3"
                                    onChange={handleChange}>
                                    <Form.Check
                                        inline
                                        label="Are you Doctor?"
                                        name="role"
                                        style={{ marginRight: '6px' }}
                                        type={'radio'}
                                        value={'doctor'}
                                        required
                                        defaultChecked={data.role === 'doctor'}
                                    />
                                    <Form.Check
                                        inline
                                        label="Are you Patient?"
                                        name="role"
                                        type={'radio'}
                                        value={'patient'}
                                        required
                                        defaultChecked={data.role === 'patient'}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name='emailId' isInvalid={validated.email} placeholder="Enter your email" onChange={handleChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter the valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" isInvalid={validated.pass} placeholder="Enter your password" onChange={handleChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        The password length must be equal & more than 6.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Button className='col-md-12 ms-auto mb-3' id='loginButton' type="submit" disabled={Object.entries(validated).length > 0}>
                                    Login
                                </Button>
                                <Form.Text muted >
                                    Don't have an account? {' '}
                                    <NavLink onClick={openRegisterModal} id='link' >
                                        {' '} Register for free
                                    </NavLink>
                                </Form.Text>
                            </Form>
                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>
        </React.Fragment>

    );
}

export default Login;
