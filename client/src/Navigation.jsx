import { Nav, Navbar, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <Nav.Link href="/">Occupied properties</Nav.Link>
            <Nav.Link href="/EmptyProps">Unoccupied properties</Nav.Link>
            <Nav.Link href="/Residents">Residents</Nav.Link>
            <Nav.Link href="/Incident">Incidents</Nav.Link>
            <Nav.Link href="/Maintenance">Maintenance</Nav.Link>
            <Nav.Link href="/Payment">Payments</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
