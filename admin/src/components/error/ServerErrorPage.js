import React from 'react';

// import { useLocation } from 'react-router-dom';

import classes from './ErrorPage.module.css';

const ServerError = props => {
  // const location = useLocation();

  return (
    <div className={classes.errorPageContainer}>
      <h1>Some error occurred!</h1>
      <p>We're working on fixing this, sorry for the inconvenience!</p>
      <span>Error Message: {props.error}</span>
    </div>
  );
};

export default ServerError;
