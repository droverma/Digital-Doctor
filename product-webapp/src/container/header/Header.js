import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLoginModal = () => setShowLogin(!showLogin);
    const handleRegisterModal = () => setShowRegister(!showRegister);
    return (
        <React.Fragment>
            <Navbar bg="primary">
                <Container>
                    <Navbar.Brand href="#home">Digital Doctor</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link href="#">About</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                            <Button variant="danger" onClick={handleLoginModal}>Login</Button>{' '}
                            <Button style={{backgroundColor:'#414BB2',marginLeft:'1rem'}} onClick={handleRegisterModal}>Register</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login show={showLogin} handleModal={handleLoginModal}/>
            <Register show={showRegister} handleModal={handleRegisterModal}/>

        </React.Fragment>
    );
}

export default Header;
