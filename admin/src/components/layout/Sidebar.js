import React from 'react';

import { useNavigate, Link } from 'react-router-dom';

import ChatSiderbar from '../chat/ChatSidebar';
import LoadingButton from '../loading/LoadingButton';
import ServerError from '../error/ServerErrorPage';

import { Nav, Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  // faUser,
  faMicrochip,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import useHttp from '../../hooks/use-https';

const Sidebar = () => {
  const { loading, sendRequest: logout, error } = useHttp();

  const navigate = useNavigate();
  const isAdmin = useSelector(state => state.auth.isAdmin);

  //hàm logout
  const logoutHandler = e => {
    e.preventDefault();
    e.preventDefault();
    const logoutHandler = data => {
      alert('Logout Success');
      navigate('/');
      window.location.reload(true);
    };
    logout(
      {
        url: `${process.env.REACT_APP_API_URL}/logout`,
      },
      logoutHandler
    );
  };

  return (
    <Container className='mt-3'>
      {error ? (
        <ServerError />
      ) : (
        <Nav className='flex-column'>
          {isAdmin && (
            <React.Fragment>
              <Nav.Item>
                MAIN
                <Nav.Link as={Link} to='/'>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faHouse} />
                    </Col>
                    <Col>
                      <p className='text-black-50'>Dashboard</p>
                    </Col>
                  </Row>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                PRODUCTS
                <Nav.Link as={Link} to='/product'>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faMicrochip} />
                    </Col>
                    <Col>
                      <p className='text-black-50'>Lists</p>
                    </Col>
                  </Row>
                </Nav.Link>
                <Nav.Link as={Link} to='/product/add-new'>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faMicrochip} />
                    </Col>
                    <Col>
                      <p className='text-black-50'>Add New</p>
                    </Col>
                  </Row>
                </Nav.Link>
              </Nav.Item>
            </React.Fragment>
          )}
          <Nav.Item>
            CHATS
            <ChatSiderbar />
          </Nav.Item>
          <Nav.Item>
            USER ACTION
            <Nav.Link onClick={logoutHandler}>
              <Row>
                <Col xs={1}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Col>
                <Col>
                  <a
                    className='text-black-50'
                    href
                    onClick={!loading ? logoutHandler : ''}
                  >
                    {loading ? <LoadingButton /> : 'Logout'}
                  </a>
                </Col>
              </Row>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </Container>
  );
};

export default Sidebar;
