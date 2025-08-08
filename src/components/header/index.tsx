import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, NavLink } from 'react-router';

import DannyzoneLogo from '@/assets/dannyzone-dot-com.svg?react';
import './header.css';

function Header() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar id="header" collapseOnSelect expand="sm">
      <Container>
        <Navbar.Brand as={Link} to={ '/' }>
          <DannyzoneLogo className="dannyzone-logo" aria-label="Dannyzone dot com site branding" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center justify-content-md-end">
          <Nav className="pt-md-3 fs-md-5 text-center text-md-end">
            <Nav.Link onClick={handleShow}>About</Nav.Link>
            <NavDropdown title="Portfolio" id="collapsible-nav-dropdown" align="start">
              <NavDropdown.Header>
                Warner Bros. Discovery Projects
              </NavDropdown.Header>
              <NavDropdown.Item href="https://www.wbdscreeners.com/">
                <i className="bi bi-globe text-info" /> WBD Screeners <span className="text-secondary">*</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.youtube.com/watch?v=Bhem5siuNZE">
                <i className="bi bi-arrow-return-right text-secondary" /> <i className="bi bi-youtube text-danger" /> Town Hall Demo Video
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.wbtvd.com/">
                <i className="bi bi-globe text-info" /> WBTVD.com <span className="text-secondary">*</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleShow}>
                <i className="bi bi-globe text-info" /> Show Us Your Funny
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>
                Wordpress Sites
              </NavDropdown.Header>
              <NavDropdown.Item href="https://www.challahcreations.com/">
                <i className="bi bi-globe text-info" /> Challah Creations
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>
                Twitch Related Projects
              </NavDropdown.Header>
              <NavDropdown.Item href="https://dcpesses.github.io/code-whisperer/">
                <i className="bi bi-globe text-info" /> Code Whisperer
              </NavDropdown.Item>
              <NavDropdown.Item href="https://asukii314.github.io/twitch-request-wheel">
                <i className="bi bi-globe text-info" /> Game Request Wheel <span className="text-secondary">*</span>
              </NavDropdown.Item>
              <NavDropdown.Header className="text-end">
                * Denotes Login Required
              </NavDropdown.Header>
            </NavDropdown>
            <Nav.Link as={NavLink} to={'/contact'}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* temporary modal displayed during development */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Coming Soon!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Whoops! Looks like this site is still not quite ready yet. Please come back later.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Header;
