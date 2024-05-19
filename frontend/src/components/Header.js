import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: 'white',
};
const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} data-bs-theme="light">
      <Container className="justify-content-center">
        <Logo alt={title} />
      </Container>
    </Navbar>
  );
};

export default Header;
