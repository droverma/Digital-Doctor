import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, NavLink, Row } from "react-bootstrap";
import loginImage from "../../assets/images/register.png";
import AuthService from "../../services/Auth.service";
const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const Register = (props) => {

  const [validated, setValidated] = useState({});
  const [registerData, setRegisterData] = useState({
    emailId: "",
    password: "",
    role: ""
  });
  const [doctorData, setDoctorData] = useState({
    emailId: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'confirmPassword') {
      setRegisterData({ ...registerData, [name]: value });
      setDoctorData({ ...doctorData, [name]: value });
    }


    switch (name) {
      case "emailId":
        if (!emailExpresion.test(value)) setValidated({ email: "invalid" });
        else {
          delete validated.email;
        }
        break;
      case "password":
        if (value.length < 6) setValidated({ pass: "invalid" });
        else {
          delete validated.pass;
        }
        break;
      case "confirmPassword":
        setRegisterData((state) => {
          if (state.password === value) {
            delete validated.con_pass;
            setValidated({})
          }
          else setValidated({ con_pass: "not matched" });
          return state;
        });
        break;
      default:
        break;
    }

  };

  const submit = (event) => {
    event.preventDefault();
    console.log(registerData)
    console.log("doctorData", doctorData);
    if (registerData.role === 'doctor') {
      AuthService.registerDoctor(doctorData).then(res => {
        openLoginModal();
        console.log(res)
      }).catch(err => console.error(err))
    }
    else
      AuthService.registerPatient(doctorData).then(res => {
        openLoginModal();
        console.log(res)
      })
      .catch(err => console.error(err))
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
          <Modal.Title>Register for Digital Doctor</Modal.Title>

          <Row className='d-flex'>
            <Col md={5} xl={6} lg={6} className="my-5">
              <Image src={loginImage} className="registerImg" />
            </Col>
            <Col md={8} lg={7} xl={5} className="my-4">
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
                  <Form.Control type="email" name="emailId" isInvalid={validated.email} onChange={handleChange} placeholder="Enter your email" required />
                  <Form.Control.Feedback type="invalid">
                    Please enter the valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group>
                  <Form.Label>Password*</Form.Label>
                  <Form.Control type="password" name="password" isInvalid={validated.pass} onChange={handleChange} placeholder="Enter your password" required />
                  <Form.Control.Feedback type="invalid">
                    The password length must be equal & more than 6.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group>
                  <Form.Label>Confirm Password*</Form.Label>
                  <Form.Control type="password" name="confirmPassword" isInvalid={validated.con_pass} onChange={handleChange} placeholder="Confirm your password" required />
                  <Form.Control.Feedback type="invalid">
                    Those passwords didn't match. Try again.
                  </Form.Control.Feedback> </Form.Group>
                <br />
                <Button className='col-md-12 mb-2 ms-auto' type="submit" disabled={Object.entries(validated).length > 0} id='loginButton'>
                  Register
                </Button>
                <Form.Text muted >
                  Already have an account? {' '}
                  <NavLink onClick={openLoginModal} id='link'>
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
};

export default Register;
