import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../../components/login/Login';
import { useNavigate } from "react-router-dom";
import Register from '../../components/register/Register';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';

const Header = (props) => {
    let navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLoginModal = () => setShowLogin(!showLogin)
    const handleRegisterModal = () => setShowRegister(!showRegister);

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
                    <Navbar.Brand href="/"><img src="../Digital_doctor_logo.png" /></Navbar.Brand>
                    :null
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
                                    {/* <Navbar.Brand className='ms-4 me-0  '>
                                        <AccountCircleIcon />
                                    </Navbar.Brand> */}
                                    {/* <NavDropdown title="Logout" id="collasible-nav-dropdown"> */}
                                        {/* <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item> */}
                                    <Button variant="warning" onClick={logout} style={{ fontWeight: 'bold' }}>Logout</Button>
                                    {/* </NavDropdown> */}
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
