import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import LoadingButton from '../loading/LoadingButton';
import ServerError from '../error/ServerErrorPage';

import { Container, Form, Alert, Button } from 'react-bootstrap';

import useHttp from '../../hooks/use-https';

const Auth = () => {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const { loading, error, sendRequest: postLogin } = useHttp();

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  //nhận input
  const emailChangeHandler = e => setEmailValue(e.target.value);
  const passwordChangeHandler = e => setPasswordValue(e.target.value);

  //xử lí alert
  const alertHandler = msg => {
    setMsg(msg);
    setShow(true);
    setTimeout(function () {
      setShow(false);
    }, 5000);
  };

  const submitHandler = event => {
    event.preventDefault();
    //validate input rỗng
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const loginNotify = data => {
        if (data.status === 200 || data.status === 201) {
          alert('Login Success');
          navigate('/');
          window.location.reload(false);
        } else {
          alertHandler(data.msg);
          setPasswordValue('');
        }
      };
      postLogin(
        {
          url: `${process.env.REACT_APP_API_URL}/admin/login`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: {
            email: emailValue,
            password: passwordValue,
          },
        },
        loginNotify
      );
    }
    setValidated(true);
  };

  return (
    <React.Fragment>
      {error ? (
        <ServerError error={error} />
      ) : (
        <Container className='p-3 my-5 d-flex flex-column w-25'>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <h1 className='text-center'>Login</h1>
            {show && (
              <Alert
                variant='danger'
                onClose={() => setShow(false)}
                dismissible
              >
                {msg}
              </Alert>
            )}
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Enter Email'
                onChange={emailChangeHandler}
                value={emailValue}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Enter password'
                onChange={passwordChangeHandler}
                value={passwordValue}
              />
            </Form.Group>
            <Button
              type='submit'
              className='w-100 mt-3'
              disabled={loading ? true : false}
            >
              {loading ? <LoadingButton /> : 'Login'}
            </Button>
          </Form>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Auth;
