import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const AdminNavbar = () => {
  return (
    <Navbar bg='light'>
      <Container>
        <Navbar.Brand href='/'>Admin Page</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
