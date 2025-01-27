import { Fragment } from 'react';

import { useSelector } from 'react-redux';

import CheckoutForm from '../components/checkout/CheckoutForm';
import NotAuthenticatedPage from '../components/error/NotAuthenticatedPage';

const Checkout = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <Fragment>
      {isLoggedIn ? (
        <div className='container'>
          <div className='cart-header'>
            <h1>CHECKOUT</h1>
            <p>
              <b>HOME / CART /</b> CHECKOUT
            </p>
          </div>
          <CheckoutForm />
        </div>
      ) : (
        <NotAuthenticatedPage />
      )}
    </Fragment>
  );
};

export default Checkout;
