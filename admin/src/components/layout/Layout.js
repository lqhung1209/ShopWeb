import React from 'react';

import AdminNavbar from './Navbar';
import Sidebar from './Sidebar';

import { Row, Col } from 'react-bootstrap';

import './Layout.css';

import { useSelector } from 'react-redux';

const Layout = props => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <React.Fragment>
          <AdminNavbar />
          <Row>
            <Col xs={2}>
              <Sidebar />
            </Col>
            <Col xs={10}>
              <main>{props.children}</main>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <main>{props.children}</main>
      )}
    </React.Fragment>
  );
};

export default Layout;
