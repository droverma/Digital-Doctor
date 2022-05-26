import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
import ProfileDetailsService from '../../services/profileDetails.service';
import './Header.css';
const Header = (props) => {
    let navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [name, setName] = useState('');

    const handleLoginModal = () => setShowLogin(!showLogin)
    const handleRegisterModal = () => setShowRegister(!showRegister);

    useEffect(() => {
        debugger
        if (localStorage.getItem("role") === "patient") {
            ProfileDetailsService.patientProfile().then((response) => {
                setName(response.data.patientName);
                localStorage.setItem("username", response.data.patientName)
            })
        }
        else if (localStorage.getItem("role") === "doctor") {
            ProfileDetailsService.doctorProfile().then((response) => {
                setName(response.data.doctorName);
                localStorage.setItem("username", response.data.doctorName)
            })
        }
        // eslint-disable-next-line
    }, localStorage.getItem("role"))

    const logout = () => {
        localStorage.clear();
        props.setisAuthenticated(false);
        navigate('/');
    }

    return (
        <React.Fragment>
            <Navbar style={{ backgroundColor: '#2AD2D9' }}>
                <Container>
                    {!localStorage.getItem('jwt-token') ?
                        <Navbar.Brand href="/"><img src="../Digital_doctor_logo.png" alt='not found' /></Navbar.Brand>
                        : null
                    }

                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {!localStorage.getItem('jwt-token') ?
                                <>
                                    <Link to={'/about'} style={{ padding: '10px' }}>About</Link>
                                    <Link to={'/contact'} style={{ padding: '10px' }}>Contact</Link>
                                    <Button variant="danger" onClick={handleLoginModal} style={{ fontWeight: 'bold' }}>Login</Button>
                                    <Button style={{ backgroundColor: 'rgb(0, 25, 255)', marginLeft: '1rem', fontWeight: 'bold' }} onClick={handleRegisterModal}>Register</Button>
                                </>
                                :
                                <>
                                    <Navbar.Brand className='ms-4 me-0 pe-4'>
                                        <span className='fs-6 fw-bold name-properties'>Welcome back {localStorage.getItem("role") === "patient" ? name : `Doctor ${name}`} !!!</span>
                                    </Navbar.Brand>
                                    <Button variant="warning" onClick={logout} style={{ fontWeight: 'bold' }}>Logout</Button>
                                </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login show={showLogin} handleModal={handleLoginModal} openRegisterModal={handleRegisterModal} />
            <Register show={showRegister} handleModal={handleRegisterModal} openLoginModal={handleLoginModal} />
        </React.Fragment>
    );
}

export default Header;
