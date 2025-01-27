import { Fragment } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import ServerError from '../error/ServerErrorPage';

import classes from './NavBar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import useHttp from '../../hooks/use-https';

const NavBar = () => {
  const { loading, sendRequest: logout, error } = useHttp();

  //check trạng thái đăng nhập của người dùng
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const fullname = useSelector(state => state.auth.user);

  const navigate = useNavigate();

  const logoutHandler = e => {
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
    <Fragment>
      {error ? (
        <ServerError />
      ) : (
        <header className={classes.header}>
          <nav className={classes.nav}>
            <ul>
              {/* nút Home */}
              <li>
                <NavLink
                  to='/'
                  className={navData =>
                    navData.isActive ? classes.active : ''
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* nút Shop */}
              <li>
                <NavLink
                  to='/shop'
                  className={navData =>
                    navData.isActive ? classes.active : ''
                  }
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes.logo}>BOUTIQUE</div>
          <nav className={classes.nav}>
            <ul>
              {/* nút Cart */}
              <li>
                <a href onClick={() => navigate('/cart', { replace: true })}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 640 512'
                    className={classes.icon}
                  >
                    <path d='M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64H48c8.8 0 16 7.2 16 16V368c0 44.2 35.8 80 80 80h18.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H450.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H144c-8.8 0-16-7.2-16-16V80C128 35.8 92.2 0 48 0H32zM192 80V272c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H464V176c0 5.9-3.2 11.3-8.5 14.1s-11.5 2.5-16.4-.8L400 163.2l-39.1 26.1c-4.9 3.3-11.2 3.6-16.4 .8s-8.5-8.2-8.5-14.1V32H240c-26.5 0-48 21.5-48 48z' />
                  </svg>
                  Cart
                </a>
              </li>
              {/* Fullname của người dùng (nếu đã login sẽ hiện) */}
              {isLoggedIn && (
                <li className={classes.dropdown}>
                  <a href>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 448 512'
                      className={classes.icon}
                    >
                      <path d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z' />
                    </svg>
                    {fullname ? fullname : ''}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 320 512'
                      className={classes.iconDrop}
                    >
                      <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
                    </svg>
                    <div className={classes.dropdownContent}>
                      <Link to='/order'>Order List</Link>
                    </div>
                  </a>
                </li>
              )}
              {/* nút Logout (nếu đã login sẽ hiện) */}
              {isLoggedIn && (
                <li>
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      transform='left-10'
                      spin
                    />
                  ) : (
                    <a href onClick={logoutHandler}>
                      (Logout)
                    </a>
                  )}
                </li>
              )}
              {/* nút Login (nếu đã login sẽ mất) */}
              {!isLoggedIn && (
                <li>
                  <a href onClick={() => navigate('/login', { replace: true })}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 448 512'
                      className={classes.icon}
                    >
                      <path d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z' />
                    </svg>
                    Login
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </header>
      )}
    </Fragment>
  );
};

export default NavBar;
