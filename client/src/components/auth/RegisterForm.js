import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ServerError from '../error/ServerErrorPage';

import classes from './RegisterForm.module.css';

import logo from '../../images/banner1.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import useHttp from '../../hooks/use-https';

const RegisterForm = () => {
  const navigate = useNavigate();

  const { error, sendRequest: postSignup, loading } = useHttp();

  const fullnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();

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
    //lấy dữ liệu nhập từ input
    const enteredFullname = fullnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    //đưa dữ liệu nhập từ input vào object
    const data = {
      fullname: enteredFullname,
      email: enteredEmail,
      password: enteredPassword,
      phone: enteredPhone,
    };
    const signupHandler = data => {
      if (data.status === 200 || data.status === 201) {
        alert('Signup Success');
        navigate('/login');
      } else {
        alertHandler(data.msg);
      }
    };
    postSignup(
      {
        url: `${process.env.REACT_APP_API_URL}/signup`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: data,
      },
      signupHandler
    );
  };

  return (
    <React.Fragment>
      {error ? (
        <ServerError error={error} />
      ) : (
        <form onSubmit={submitHandler} className={classes.registerBackground}>
          <img src={logo} alt='register Background' />
          <div className={classes.registerForm}>
            {show && <div className={classes.errorMessage}>{msg}</div>}
            <h2>Sign Up</h2>
            <input
              type='email'
              placeholder='Example: email@test.com'
              ref={emailInputRef}
            />
            <input type='text' placeholder='Full Name' ref={fullnameInputRef} />
            <input
              type='password'
              placeholder='Password'
              ref={passwordInputRef}
            />
            <input type='number' placeholder='Phone' ref={phoneInputRef} />
            <button className='btn' disabled={loading ? true : false}>
              {loading ? (
                <React.Fragment>
                  <FontAwesomeIcon icon={faSpinner} transform='left-10' spin />
                  Loading
                </React.Fragment>
              ) : (
                'SIGN UP'
              )}
            </button>
            {/* chuyển sang Đăng nhập */}
            <div className={classes.formActions}>
              Login? <Link to='/login'>Click</Link>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default RegisterForm;
