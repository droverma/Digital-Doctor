import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLoginModal = () => setShowLogin(!showLogin)
    const handleRegisterModal = () => setShowRegister(!showRegister);

    return (
        <React.Fragment>
            <Navbar style={{ backgroundColor: '#2AD2D9' }}>
                <Container>
                    <Navbar.Brand href="/"><img src="../Digital_doctor_logo.png" /></Navbar.Brand>
                    <Navbar.Brand>Digital Doctor</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link to={'/about'} style={{ padding: '10px' }}>About</Link>
                            <Link to={'/contact'} style={{ padding: '10px' }}>Contact</Link>
                            <Button variant="danger" onClick={handleLoginModal} style={{ fontWeight: 'bold' }}>Login</Button>{' '}
                            <Button style={{ backgroundColor: 'rgb(0, 25, 255)', marginLeft: '1rem', fontWeight: 'bold' }} onClick={handleRegisterModal}>Register</Button>
                            <Navbar.Brand className='ms-4 me-0  '>
                                <AccountCircleIcon />
                            </Navbar.Brand>
                            <NavDropdown title="" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                            </NavDropdown>
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
