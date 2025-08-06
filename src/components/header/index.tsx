import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import DannyzoneLogo from '@/assets/dannyzone-dot-com.svg?react';
import './header.css';

function Header() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const BASE_PATH = import.meta.env.BASE_URL;

  // normalize relative paths
  const navUrl = (path:string) => {
    let base = BASE_PATH;
    // remove trailing slash when configured
    if (base.endsWith('/')) {
      base = base.substring(0, base.length-1);
    }
    const relUrl = `${base}${path}`;
    // window.console.log({base, relUrl});
    return relUrl;
  };

  // const checkActive = (slug:string) => {
  //   if (!window.location || !slug) {
  //     return false;
  //   }
  //   return (window.location.pathname === slug || (window.location.pathname.includes(slug) && slug.length > 1));
  // };

  const navigation = () => {

    return (
      <Nav className="pt-3 fs-5 text-center text-md-end">
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
        <Nav.Link href={ navUrl('/contact') }>
          Contact
        </Nav.Link>
      </Nav>
    );
  };

  return (
    <Navbar id="header" collapseOnSelect expand="sm" data-bs-theme="dark">
      <Container fluid className="flex-column nav-stack">
        <Navbar.Brand href={ navUrl('/') } className="flex-grow-">
          <div>
            <DannyzoneLogo className="dannyzone-logo" aria-label="Dannyzone dot com site branding" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center justify-content-md-end">
          {navigation()}
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
