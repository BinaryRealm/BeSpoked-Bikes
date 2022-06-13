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
      <Navbar bg="light" expand="lg" className="custom-nav">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="h1 mb-0">Bespoked Bikes</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <LinkContainer to="/salespersons">
                <Nav.Link>Salespersons</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/products">
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/customers">
                <Nav.Link>Customers</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/sales">
                <Nav.Link>Sales</Nav.Link>
              </LinkContainer>
              <LinkContainer to="new-sale">
                <Nav.Link>New Sale</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/report">
                <Nav.Link>Report</Nav.Link>
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
