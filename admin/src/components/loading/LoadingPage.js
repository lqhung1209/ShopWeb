import React from 'react';

import classes from './LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <div className={classes.loadingPageContainer}>
      <div className={classes.loader}></div>
      <h1>Data is loading, please wait .............</h1>
    </div>
  );
};

export default LoadingPage;
