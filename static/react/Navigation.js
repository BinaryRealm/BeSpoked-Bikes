import { React, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

function Navigation() {
  const [userName, setUsername] = useState('');

  useEffect(() => {
    fetch('/username')
      .then((response) => response.json())
      .then((data) => { setUsername(data); })
      .catch((error) => { console.error('Error:', error); }); // eslint-disable-line no-console
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg" className="yellow-nav">
        <Container>
          <LinkContainer to="/search">
            <Navbar.Brand className="h1 mb-0">FoodQuest</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <LinkContainer to="/search">
                <Nav.Link>Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/recommendation">
                <Nav.Link>Recommendation</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="row justify-content-end">
              <div className="col-4" />
              <NavDropdown title={`${userName}`}>
                <NavDropdown.Item href="/logout">Sign out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Navigation;
