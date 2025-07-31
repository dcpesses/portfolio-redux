import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import DannyzoneLogo from '@/assets/dannyzone-dot-com.svg?react';
import './header.css';

function Header() {
  return (
    <Navbar id="header" collapseOnSelect expand="md" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <div aria-label="Dannyzone dot com site branding">
            <DannyzoneLogo height="59" />
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
