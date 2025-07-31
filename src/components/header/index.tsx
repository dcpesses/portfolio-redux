import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';

import './header.css';

function Header() {
  return (
    <Navbar id="header" collapseOnSelect expand="md" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <div><Image src="https://portfolio.dannyzone.com/images/dannyzone-dot-com3.png" height="59px" alt="DannyZone.com - The musings of a creative developer&#8230;" /></div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
