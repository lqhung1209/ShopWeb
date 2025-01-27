import { Fragment, useState, useEffect } from 'react';

import { useLocation, Link } from 'react-router-dom';

import OrderDetailList from './OrderDetailList';
import classes from './OrderDetail.module.css';

const OrderDetail = () => {
  const { state } = useLocation();
  const [order, setOrder] = useState();

  function formatCash(str) {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  }

  useEffect(() => {
    if (state) {
      setOrder(state.order);
    }
  }, [state]);

  return (
    <Fragment>
      <div className={classes.orderContainer}>
        {!order ? (
          <div className={classes.orderInfo}>
            <h1>Order Not Found!</h1>
            <p>
              Please go to <Link to='/order'>Order Page</Link> and check produck
            </p>
          </div>
        ) : (
          <Fragment>
            <div className={classes.orderInfo}>
              <h1>INFOMATION ORDER</h1>
              <p>ID User: {order.creator}</p>
              <p>Full Name: {order.fullname}</p>
              <p>Phone: {order.phone}</p>
              <p>Address: {order.address}</p>
              <p>Total: {formatCash(order.total.toString())} VND</p>
            </div>
            <div className={classes.orderTable}>
              <table>
                <tr>
                  <th>ID PRODUCT</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>COUNT</th>
                </tr>
                {order.products
                  ? order.products.map(e => (
                      <OrderDetailList
                        product={e.product}
                        quantity={e.quantity}
                      />
                    ))
                  : ''}
              </table>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default OrderDetail;
