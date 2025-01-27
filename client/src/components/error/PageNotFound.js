import React from 'react';

import { Link } from 'react-router-dom';

import classes from './ErrorPage.module.css';

const PageNotFound = () => {
  return (
    <div className={classes.errorPageContainer}>
      <h1>Page Not Found!</h1>
      <p>
        The Page you are looking for doesn't exist or an other error occured. Go
        to <Link to='/'>Home</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
