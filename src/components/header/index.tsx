import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router';

import DannyzoneLogo from '@/assets/dannyzone-dot-com.svg?react';
import './header.css';

function Header() {

  return (
    <Navbar id="header" collapseOnSelect expand="sm">
      <Container>
        <Navbar.Brand as={Link} to={ '/' }>
          <DannyzoneLogo className="dannyzone-logo" aria-label="Dannyzone dot com site branding" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center justify-content-md-end">
          <Nav className="pt-md-3 fs-md-5 text-center text-md-end">
            <Nav.Link as={NavLink} to={'/about'}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to={'/projects'}>
              Projects
            </Nav.Link>
            <Nav.Link as={NavLink} to={'/contact'}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
