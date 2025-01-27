import { Fragment } from 'react';
import Footer from './Footer';

import classes from './Layout.module.css';

import NavBar from './NavBar';

const Layout = props => {
  return (
    <Fragment>
      <NavBar />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
