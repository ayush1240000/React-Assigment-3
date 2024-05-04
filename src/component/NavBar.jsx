import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from "react-router-dom";

const NavBar = () => { 
    return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand href="/"></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/"  as={NavLink} >Home</Nav.Link>
            <Nav.Link to="/Login" as={NavLink}>Login</Nav.Link>
            {/* <Nav.Link to="/Dashboard" as={NavLink}>Dashboard</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

