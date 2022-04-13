import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLoginModal = () => setShowLogin(!showLogin)
    const handleRegisterModal = () => setShowRegister(!showRegister);

    return (
        <React.Fragment>
            <Navbar style={{ backgroundColor: '#2AD2D9' }}>
                <Container>
                    <Navbar.Brand href="#home">Digital Doctor</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link><Link to={'/about'}>About</Link> </Nav.Link>
                            <Nav.Link><Link to={'/contact'}>Contact</Link> </Nav.Link>
                            <Button variant="danger" onClick={handleLoginModal}>Login</Button>{' '}
                            <Button style={{ backgroundColor: '#414BB2', marginLeft: '1rem' }} onClick={handleRegisterModal}>Register</Button>
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
