import React from 'react';
import { Row, Col, Modal, Button, Form, Image } from 'react-bootstrap';
import loginImage from '../../assets/images/loginImage.jpg'

const Login = (props) => {
    return (
        <Modal size='lg' show={props.show} onHide={props.handleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome to Digital Doctor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='d-flex'>
                    <Col md={5} xl={6} lg={6}>
                        <Image src={loginImage} />
                    </Col>
                    <Col md={8} lg={7} xl={5} className="my-3">
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
                            <Button className='col-md-12 ms-auto' type="submit" style={{backgroundColor:'#0019FF',fontWeight:'bold',fontFamily:'OpenSans sans-serif !important;'}}>
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    );
}

export default Login;
