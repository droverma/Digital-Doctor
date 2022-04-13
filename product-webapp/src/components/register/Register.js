import React, { useState } from 'react';
import { Button, Col, Form, Image, Modal, NavLink, Row } from 'react-bootstrap';
import loginImage from '../../assets/images/register.png';
// import '../../assets/style/style.css';
const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const Register = (props) => {
    const [validated, setValidated] = useState({});
    const [registerData, setRegisterData] = useState({
        "email": "",
        "password": "",
        "confirmPassword": "",
        "role": "",
    })
    const hanldeChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                if (!emailExpresion.test(value))
                    setValidated({ email: 'email is invalid' })
                else {
                    delete validated.email;
                }
                break;
            default:
                break;
        }
        console.log(registerData)
        if (registerData.password === registerData.confirmPassword)
            console.log(registerData)
        else
            setValidated({ 'pass': 'not matched' })
        setRegisterData({ ...registerData, [name]: value })

    }
    const submit = (event) => {
        event.preventDefault();
        console.log(registerData)


    }

    const openLoginModal = () => {
        props.handleModal();
        props.openLoginModal();
    }
    const onHide = () => {
        setRegisterData({})
        setValidated({})
        props.handleModal()
    }

    return (
        <React.Fragment>
            <Modal size='lg' show={props.show} onHide={onHide}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Modal.Title style={{ textAlign: "center", fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important' }}>Register for Digital Doctor</Modal.Title>

                    <Row className='d-flex'>
                        <Col md={5} xl={6} lg={6} className="my-5">
                            <Image src={loginImage} style={{ width: "23rem", height: '22rem' }} />
                        </Col>
                        <Col md={8} lg={7} xl={5} className="my-4">
                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3"
                                    onChange={hanldeChange}>
                                    <Form.Check
                                        inline
                                        label="Are you Doctor?"
                                        name="role"
                                        style={{ marginRight: '6px' }}
                                        type={'radio'}
                                        value={'doctor'}
                                        required
                                        defaultChecked={registerData.role === 'doctor'}
                                    />
                                    <Form.Check
                                        inline
                                        label="Are you Patient?"
                                        name="role"
                                        type={'radio'}
                                        value={'patient'}
                                        required
                                        defaultChecked={registerData.role === 'patient'}
                                    />

                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email*</Form.Label>
                                    <Form.Control type="email" name="email" isInvalid={validated.email} onChange={hanldeChange} placeholder="Enter your email" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter the valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Password*</Form.Label>
                                    <Form.Control type="password" name="password" onChange={hanldeChange} placeholder="Enter your password" required />
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Confirm Password*</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" isInvalid={validated.pass} onChange={hanldeChange} placeholder="Confirm your password" required />
                                    <Form.Control.Feedback type="invalid">
                                        Those passwords didn't match. Try again.
                                    </Form.Control.Feedback> </Form.Group>
                                <br />
                                <Button className='col-md-12 mb-2 ms-auto' type="submit" disabled={Object.entries(validated).length > 0} style={{ backgroundColor: '#0019FF', fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important' }}>
                                    Register
                                </Button>
                                <Form.Text muted >
                                    Already have an account? {' '}
                                    <NavLink style={{ backgroundColor: '#ffffff', border: '0px', color: "#414BB2", padding: '0px', display: 'inline' }} onClick={openLoginModal}>
                                        {' '} <span>Login Here</span>
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

export default Register;
