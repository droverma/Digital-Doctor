import React from 'react';
import { Button, Col, Form, Image, Modal, NavLink, Row } from 'react-bootstrap';
import loginImage from '../../assets/images/register.png';
// import '../../assets/style/style.css';

const Register = (props) => {

    const openLoginModal = () => {
        props.handleModal();
        props.openLoginModal();
    }

    return (
        <React.Fragment>
            <Modal size='lg' show={props.show} onHide={props.handleModal}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Modal.Title style={{ textAlign: "center", fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important;' }}>Register for Digital Doctor</Modal.Title>

                    <Row className='d-flex'>
                        <Col md={5} xl={6} lg={6} className="my-5">
                            <Image src={loginImage} style={{ width: "23rem", height: '22rem' }} />
                        </Col>
                        <Col md={8} lg={7} xl={5} className="my-4">
                            <Form>
                                <Form.Group className="mb-3 row" >
                                    <div className='col-md-8'> <Form.Check
                                        inline
                                        label="Doctor"
                                        name="group1"
                                        type={'radio'}
                                    /></div>
                                    <div className='col-md-2'><Form.Check
                                        inline
                                        label="Patient"
                                        name="group1"
                                        type={'radio'}
                                    /></div>

                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter your password" />
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm your password" />
                                </Form.Group>
                                <br />
                                <Button className='col-md-12 mb-2 ms-auto' type="submit" style={{ backgroundColor: '#0019FF', fontWeight: 'bold', fontFamily: 'OpenSans sans-serif !important;' }}>
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
