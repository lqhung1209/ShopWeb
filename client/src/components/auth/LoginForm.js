import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ServerError from '../error/ServerErrorPage';

import classes from './LoginForm.module.css';

import logo from '../../images/banner1.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import useHttp from '../../hooks/use-https';

const LoginForm = () => {
  const navigate = useNavigate();

  const { error, sendRequest: postLogin, loading } = useHttp();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  //xử lí alert
  const alertHandler = msg => {
    setMsg(msg);
    setShow(true);
    setTimeout(function () {
      setShow(false);
    }, 5000);
  };

  //hàm xử lý Submit
  const submitHandler = e => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const loginHandler = data => {
      if (data.status === 200 || data.status === 201) {
        alert('Login Success');
        navigate('/');
        window.location.reload(false);
      } else {
        alertHandler(data.msg);
        passwordInputRef.current.value = '';
      }
    };
    postLogin(
      {
        url: `${process.env.REACT_APP_API_URL}/login`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { email: enteredEmail, password: enteredPassword },
      },
      loginHandler
    );
  };

  return (
    <React.Fragment>
      {error ? (
        <ServerError error={error} />
      ) : (
        <form onSubmit={submitHandler} className={classes.loginBackground}>
          <img src={logo} alt='Login Background' />
          <div className={classes.loginForm}>
            {show && <div className={classes.errorMessage}>{msg}</div>}
            <h2>Sign In</h2>
            <input placeholder='Email' ref={emailInputRef} required />
            <input
              type='password'
              placeholder='Password'
              ref={passwordInputRef}
              required
            />
            <button className='btn' disabled={loading ? true : false}>
              {loading ? (
                <React.Fragment>
                  <FontAwesomeIcon icon={faSpinner} transform='left-10' spin />
                  Loading
                </React.Fragment>
              ) : (
                'SIGN IN'
              )}
            </button>
            {/* chuyển sang Đăng ký */}
            <div className={classes.formActions}>
              Create an account? <Link to='/register'>Sign up</Link>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
