import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Nav, Row, Col, Badge } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

import openSocket from 'socket.io-client';

import useHttp from '../../hooks/use-https';

const ChatSiderbar = () => {
  const { loading, sendRequest: requestHandler, error } = useHttp();

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getChat = data => {
      setChatList(data.chats);
    };
    requestHandler(
      { url: `${process.env.REACT_APP_API_URL}/admin/chat` },
      getChat
    );
    const socket = openSocket(`${process.env.REACT_APP_API_URL}`);
    socket.on('chat', data => {
      if (data.action === 'post') {
        requestHandler(
          { url: `${process.env.REACT_APP_API_URL}/admin/chat` },
          getChat
        );
      }
    });
  }, [requestHandler]);

  // const seenMessageHandler = eid => {
  //   // e.preventDefault();
  //   const postMakeAsRead = data => {};
  //   requestHandler(
  //     {
  //       url: `${process.env.REACT_APP_API_URL}/make-message`,
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       data: {
  //         roomId: eid,
  //         isAdmin: true,
  //       },
  //     },
  //     postMakeAsRead
  //   );
  // };

  return (
    <React.Fragment>
      {error ? (
        <Nav.Link as={Link} to='/chat-room'>
          Chat Error, Please check database
        </Nav.Link>
      ) : //đang load hoặc không có tin nhắn
      chatList.length === 0 ? (
        <Nav.Link as={Link} to='/chat-room'>
          <Row>
            <Col xs={1}>
              <FontAwesomeIcon icon={faMessage} />
            </Col>
            <Col xs={8}>
              <p className='text-black-50'>No Chat Here</p>
            </Col>
            <Col xs={2}>
              <Badge bg='secondary'>0</Badge>
            </Col>
          </Row>
        </Nav.Link>
      ) : (
        chatList.map(e => (
          <Nav.Link
            as={Link}
            to={loading ? '' : `/chat-room/${e._id}`}
            // onClick={() => seenMessageHandler(e._id)}
          >
            <Row>
              <Col xs={1}>
                <FontAwesomeIcon icon={faMessage} />
              </Col>
              <Col xs={8}>
                <p
                  className='text-black-50'
                  style={{ 'word-wrap': 'break-word' }}
                >
                  {e._id}
                </p>
              </Col>
              <Col xs={2}>
                {/* đếm số tin nhắn của user mà admin chưa đọc */}
                <Badge bg='secondary'>
                  {
                    e.message.filter(
                      f => f.isAdmin === false && f.status === false
                    ).length
                  }
                </Badge>
              </Col>
            </Row>
          </Nav.Link>
        ))
      )}
    </React.Fragment>
  );
};

export default ChatSiderbar;
