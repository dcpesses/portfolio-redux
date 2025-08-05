import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import DannyzoneLogo from '@/assets/dannyzone-dot-com.svg';
import './header.css';

function Header() {
  return (
    <Navbar id="header" collapseOnSelect expand="md" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <div aria-label="Dannyzone dot com site branding">
            <DannyzoneLogo height="59" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="pt-3 fs-5">
            <Nav.Link href="#about">About</Nav.Link>
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
              <NavDropdown.Item href="#projects">
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
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
