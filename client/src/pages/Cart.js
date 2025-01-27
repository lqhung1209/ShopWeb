import { Fragment } from 'react';

import { useSelector } from 'react-redux';

import CartTable from '../components/cart/CartTable';
import NotAuthenticatedPage from '../components/error/NotAuthenticatedPage';

const Cart = props => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Fragment>
      {isLoggedIn ? (
        <div className='container'>
          <div className='cart-header'>
            <h1>CART</h1>
            <p>CART</p>
          </div>
          <CartTable products={props.products} />
        </div>
      ) : (
        <NotAuthenticatedPage />
      )}
    </Fragment>
  );
};

export default Cart;
