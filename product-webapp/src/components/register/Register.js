import React from 'react';
import { Row, Col, Modal, Button, Form, Image } from 'react-bootstrap';
import loginImage from '../../assets/images/registerImage.png'
// import '../../assets/style/style.css';

const Register = (props) => {
    return (
        <Modal size='lg' show={props.show} onHide={props.handleModal}>
            <Modal.Header closeButton>
                
                <Modal.Title> <span>Register for Digital Doctor</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row className='d-flex'>
                    <Col md={5} xl={7} lg={6} >
                        <Image src={loginImage} style={{ width: "27rem" }} />
                    </Col>
                    <Col md={8} lg={7} xl={5} className="my-3">
                        <Form>
                            <Form.Group className="mb-3 row" >
                                <div className='col-md-6'> <Form.Check
                                    inline
                                    label="Are you a Doctor?"
                                    name="group1"
                                    type={'radio'}
                                /></div>
                                <div className='col-md-6'><Form.Check
                                    inline
                                    label="Are you a Patient?"
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
                                <Form.Text style={{ backgroundColor: '#ffffff', border: '0px', color: "#414BB2" }}>
                                    {' '} Login Here
                                </Form.Text>
                            </Form.Text>
                        </Form>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    );
}

export default Register;
