import React, { useState, useRef, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import ServerError from '../error/ServerErrorPage';

import {
  Card,
  Row,
  Col,
  Container,
  Image,
  Button,
  Form,
} from 'react-bootstrap';

import openSocket from 'socket.io-client';

import useHttp from '../../hooks/use-https';

const ChatForm = ({ messages }) => {
  const { loading, sendRequest: requestHandler, error } = useHttp();

  const params = useParams();

  const roomId = params.roomId;
  const [chatMessage, setChatMessage] = useState([]);

  const [message, setMessage] = useState('');
  const messageChangeHandler = e => setMessage(e.target.value);

  const [validated, setValidated] = useState(false);

  //vừa vào page chuyển về cuối tin nhắn
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    const getChatRoom = data => {
      setChatMessage(data.chatMessage);
    };
    if (roomId) {
      requestHandler(
        {
          url: `${process.env.REACT_APP_API_URL}/admin/chat/${roomId}`,
        },
        getChatRoom
      );
    }
    const socket = openSocket(`${process.env.REACT_APP_API_URL}`);
    socket.on('chat', data => {
      if (data.action === 'post') {
        requestHandler(
          {
            url: `${process.env.REACT_APP_API_URL}/admin/chat/${roomId}`,
          },
          getChatRoom
        );
      }
    });
    scrollToBottom();
  }, [messages, requestHandler, roomId]);

  const submitHandler = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const postMessage = data => {};
      requestHandler(
        {
          url: `${process.env.REACT_APP_API_URL}/admin/add-message`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: {
            roomId,
            message,
          },
        },
        postMessage
      );
      setMessage('');
    }
    setValidated(false);
  };
  return (
    <Container>
      {error ? (
        <ServerError error={error} />
      ) : !roomId ? (
        <Card className='mt-3' style={{ height: '80vh' }}>
          <Card.Header>No room here</Card.Header>
          <Card.Body className='text-center'>
            <h1>No Room Chat Here!</h1>
          </Card.Body>
        </Card>
      ) : (
        <React.Fragment>
          <Card className='mt-3' style={{ height: '80vh', overflow: 'auto' }}>
            <Card.Header>Room ID : {roomId}</Card.Header>
            <Card.Body>
              {chatMessage.length > 0
                ? chatMessage.map(e =>
                    e.isAdmin ? (
                      <Row className='align-items-center mb-2'>
                        <Col xs={3}></Col>
                        <Col xs={9}>
                          <Card
                            className='bg-primary text-end justify-content-end'
                            style={{
                              width: 'max-content',
                              'max-width': '100%',
                              float: 'right',
                            }}
                          >
                            <Card.Body>{e.content}</Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    ) : (
                      <Row className='align-items-center mb-2'>
                        <Col xs={1} className='text-center'>
                          <Image
                            src='https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg'
                            className='w-75'
                            roundedCircle
                          />
                        </Col>
                        <Col xs={9}>
                          <Card
                            className='bg-secondary'
                            style={{
                              width: 'max-content',
                              'max-width': '100%',
                            }}
                          >
                            <Card.Body>{e.content}</Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    )
                  )
                : ''}
              <div ref={messagesEndRef} />
            </Card.Body>
          </Card>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Row className='mt-2'>
              <Col xs={11}>
                <Form.Group>
                  <Form.Control
                    required
                    type='text'
                    placeholder={
                      loading
                        ? 'Sending ......................................'
                        : 'Type your message'
                    }
                    onChange={messageChangeHandler}
                    value={message}
                  />
                </Form.Group>
              </Col>
              <Col xs={1}>
                <Button
                  type='submit'
                  variant={loading ? 'secondary' : 'primary'}
                  style={{ 'border-radius': '50%' }}
                  disabled={loading ? true : false}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    width={25}
                  >
                    <path d='M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z' />
                  </svg>
                </Button>
              </Col>
            </Row>
          </Form>
        </React.Fragment>
      )}
    </Container>
  );
};

export default ChatForm;
