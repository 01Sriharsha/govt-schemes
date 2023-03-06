import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { CustomContext } from '../../context/AuthContext';
import { BiLogOut } from 'react-icons/bi'
import { useState } from 'react';
import Logout from '../authentication/Logout';

export default function Header() {

    const context = CustomContext();

    const { pathname } = useLocation();

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    return (
        <Navbar expand="md" className='header navbar-light bg-light shadow' sticky='top'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className='text-p fw-bolder'>Govt Schemes</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="header-nav my-2 my-lg-0 d-flex w-100 justify-content-between p-1 align-items-md-baseline"
                        style={{ maxHeight: '150px' }}
                        navbarScroll
                    >
                        <div className='d-flex flex-column flex-md-row'>
                            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                            <Nav.Link as={Link} to={"/all-schemes"}>Schemes</Nav.Link>
                            {(context?.isAuthenticated)
                                ? (
                                    (context?.user === "admin")
                                        ? <Nav.Link as={Link} to={"/admin/dashboard"}>
                                            Dashboard
                                        </Nav.Link>
                                        : (
                                            <>
                                                <Nav.Link as={Link} to={"/member/matching-schemes"}>Matching Schemes</Nav.Link>
                                                <Nav.Link as={Link} to={"/member/applications"}>My Applications</Nav.Link>
                                            </>
                                        )
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to={"/about"}>About Us</Nav.Link>
                                        <Nav.Link as={Link} to={"/contact"}>Contact Us</Nav.Link>
                                    </>
                                )
                            }
                        </div>
                        <div className='d-flex flex-column flex-md-row align-items-md-center'>
                            {context?.isAuthenticated
                                ? (
                                    <>
                                        {(context?.isAuthenticated && context?.user !== "admin") &&
                                            <Nav.Link as={Link} to={"/member/queries"}>
                                                My Queries
                                            </Nav.Link>
                                        }
                                        <div
                                            className="logout d-flex align-items-center justify-content-md-center gap-1 ms-2 py-1"
                                            style={{ cursor: 'pointer' }}
                                            onClick={toggle}
                                        >
                                            <span>Logout</span>
                                            <BiLogOut size={'1.3rem'} />
                                            <Logout show={show} toggle={toggle} />
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <Nav.Link as={Link} to={"/member/login"}>Memeber Login</Nav.Link>
                                        <Nav.Link as={Link} to={"/admin/login"}>Admin Login</Nav.Link>
                                    </>
                                )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}