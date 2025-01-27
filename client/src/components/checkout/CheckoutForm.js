import { Fragment, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import CheckoutPrice from './CheckoutPrice';
import LoadingButton from '../loading/LoadingButton';
import ServerError from '../error/ServerErrorPage';

import classes from './CheckoutForm.module.css';

import useHttp from '../../hooks/use-https';

const CheckoutForm = () => {
  const { error, sendRequest: requestHandler, loading } = useHttp();
  const navigate = useNavigate();

  const [cartAdded, setCartAdded] = useState([]);

  const [fullnameEntered, setFullnameEntered] = useState('');
  const [emailEntered, setEmailEntered] = useState('');
  const [phoneEntered, setPhoneEntered] = useState('');
  const [addressEntered, setAddressEntered] = useState('');

  const fullnameHandler = e => setFullnameEntered(e.target.value);
  const emailHandler = e => setEmailEntered(e.target.value);
  const phoneHandler = e => setPhoneEntered(e.target.value);
  const addressHandler = e => setAddressEntered(e.target.value);

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  //xử lí alert
  const alertHandler = msg => {
    setMsg(msg);
    setShow(true);
    setTimeout(function () {
      setShow(false);
    }, 5000);
  };

  //hàm tính tổng giá tiền của tất cả sản phẩm
  let checkoutPrice = 0;
  cartAdded &&
    cartAdded.map(e => (checkoutPrice += e.productId.price * e.quantity));

  const submitHandler = e => {
    e.preventDefault();
    const orderHandler = data => {
      if (data.status === 200 || data.status === 201) {
        alert(data.msg);
        navigate('/order');
        window.location.reload(false);
      } else {
        alertHandler(data.msg);
      }
    };
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/add-order`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          fullname: fullnameEntered,
          email: emailEntered,
          phone: phoneEntered,
          address: addressEntered,
        },
      },
      orderHandler
    );
  };

  useEffect(() => {
    //lấy dữ liệu cart của user
    const getCartData = data => {
      setCartAdded(data.cartItems);
    };
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/cart`,
      },
      getCartData
    );
  }, [requestHandler]);

  return (
    <Fragment>
      <h2>BILLING DETAILS</h2>
      {error ? (
        <ServerError error={error} />
      ) : (
        <form className={classes.checkoutForm} onSubmit={submitHandler}>
          <div className={classes.formControl}>
            {show && <div className={classes.errorMessage}>{msg}</div>}
            <label htmlFor='fullname'>FULL NAME:</label>
            <input
              id='fullname'
              type='text'
              placeholder='Enter Your Full Name Here!'
              value={fullnameEntered}
              onChange={fullnameHandler}
              required
            />
            <label htmlFor='email'>EMAIL:</label>
            <input
              id='email'
              type='email'
              placeholder='Enter Your Email Here!'
              value={emailEntered}
              onChange={emailHandler}
              required
            />
            <label htmlFor='phone'>PHONE NUMBER:</label>
            <input
              id='phone'
              type='number'
              placeholder='Enter Your Phone Number Here!'
              value={phoneEntered}
              onChange={phoneHandler}
              required
            />
            <label htmlFor='address'>ADDRESS:</label>
            <input
              id='address'
              type='text'
              placeholder='Enter Your Address Here!'
              value={addressEntered}
              onChange={addressHandler}
              required
            />
            <button type='submit' disabled={loading ? true : false}>
              {loading ? <LoadingButton /> : 'Place order'}
            </button>
          </div>
          {/* tên, giá tiền và số lượng sản phẩm muốn đặt */}
          <div className={classes.checkoutPrice}>
            <h2>YOUR ORDER</h2>
            {cartAdded.map(e => (
              <CheckoutPrice
                key={e._id}
                id={e._id}
                product={e.productId}
                quantity={e.quantity}
              />
            ))}
            {/* tổng giá tiền */}
            <div className={classes.checkoutPriceNumber}>
              <h3>TOTAL</h3>
              <p className={classes.normal}>
                {checkoutPrice.toLocaleString()} VND
              </p>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default CheckoutForm;
