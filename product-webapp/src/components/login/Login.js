import React, { useState } from 'react';
import { Button, Col, Form, Image, Modal, NavLink, Row } from 'react-bootstrap';
import loginImage from '../../assets/images/loginImage.jpg';
const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const Login = (props) => {
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState({
        "email": "",
        "password": "",
    })

    const openRegisterModal = () => {
        props.handleModal();
        props.openRegisterModal();
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if (name === "email")
            if (!emailExpresion.test(value))
                setValidated({ email: 'email is invalid' })
            else {
                delete validated.email;
            }
        console.log(data, validated)
    }
  
    const submit = (event) => {
        event.preventDefault();
        console.log(data)
        setValidated(true)
        // AuthService.login().then(res => console.log(res)).catch(err => console.log(err))

    }

    return (
        <React.Fragment>
            <Modal size='lg' show={props.show} onHide={props.handleModal}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Modal.Title style={{ textAlign: "center", fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important' }}>Welcome to Digital Doctor</Modal.Title>
                    <Row className='d-flex'>
                        <Col md={5} xl={6} lg={6}>
                            <Image src={loginImage} style={{ width: '26rem' }} />
                        </Col>
                        <Col md={8} lg={7} xl={5} className="my-5">
                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name='email' isInvalid={validated.email} placeholder="Enter your email" onChange={handleChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter the valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
                                </Form.Group>
                                <br />
                                <Button className='col-md-12 ms-auto mb-3' type="submit" disabled={Object.entries(validated).length > 0} style={{ backgroundColor: '#0019FF', fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important' }}>
                                    Login
                                </Button>
                                <Form.Text muted >
                                    Don't have an account? {' '}
                                    <NavLink style={{ backgroundColor: '#ffffff', border: '0px', color: "#414BB2", padding: '0px', display: 'inline' }} onClick={openRegisterModal}>
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
