import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Company Name</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/catalog">Catalog</Nav.Link>
          <Nav.Link href="/customers">Customers</Nav.Link>
          <Nav.Link href="/orders">Orders</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
