import { Fragment } from 'react';

import { useSelector } from 'react-redux';

import OrderTable from '../components/order/OrderTable';
import NotAuthenticatedPage from '../components/error/NotAuthenticatedPage';

const Order = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Fragment>
      {isLoggedIn ? (
        <div className='container'>
          <div className='cart-header'>
            <h1>HISTORY</h1>
            <p>HISTORY</p>
          </div>
          <OrderTable />
        </div>
      ) : (
        <NotAuthenticatedPage />
      )}
    </Fragment>
  );
};

export default Order;
