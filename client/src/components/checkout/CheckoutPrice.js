import { Fragment } from 'react';

import classes from './CheckoutForm.module.css';

const CheckoutPrice = props => {
  const product = props.product;
  const quantity = props.quantity;

  return (
    <Fragment>
      <div className={classes.checkoutPriceNumber}>
        <h3 className={classes.name}>{product.name}</h3>
        <p>
          {Number(product.price).toLocaleString()} VND x {quantity}
        </p>
      </div>
      <hr />
    </Fragment>
  );
};

export default CheckoutPrice;
