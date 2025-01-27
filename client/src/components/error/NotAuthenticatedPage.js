import React from 'react';

import { Link } from 'react-router-dom';

import classes from './ErrorPage.module.css';

const NotAuthenticatedPage = () => {
  return (
    <div className={classes.errorPageContainer}>
      <h1>Not Authenticated!</h1>
      <p>
        You do not have permission to access this page. Go to{' '}
        <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default NotAuthenticatedPage;
