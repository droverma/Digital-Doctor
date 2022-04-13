import React from 'react';
import { Button, Col, Form, Image, Modal, NavLink, Row } from 'react-bootstrap';
import loginImage from '../../assets/images/loginImage.jpg';

const Login = (props) => {
    
    const openRegisterModal = () => {
        props.handleModal();
        props.openRegisterModal();
    }
    
    return (
        <React.Fragment>
            <Modal size='lg' show={props.show} onHide={props.handleModal}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Modal.Title style={{ textAlign: "center", fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important;' }}>Welcome to Digital Doctor</Modal.Title>
                    <Row className='d-flex'>
                        <Col md={5} xl={6} lg={6}>
                            <Image src={loginImage} style={{ width: '26rem' }} />
                        </Col>
                        <Col md={8} lg={7} xl={5} className="my-5">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>
                                <br />
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter your password" />
                                </Form.Group>
                                <br />
                                <Button className='col-md-12 ms-auto mb-3' type="submit" style={{ backgroundColor: '#0019FF', fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important;' }}>
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
