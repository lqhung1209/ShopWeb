import { Fragment, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

import ServerError from '../error/ServerErrorPage';

import classes from './ProductDetail.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import useHttp from '../../hooks/use-https';

const ProductDetail = props => {
  const product = props.product;

  const { loading, sendRequest: addCart, error } = useHttp();

  const dispatch = useDispatch();
  //check trạng thái đăng nhập của người dùng
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  //lấy quantity mặc định
  const quantity = useSelector(state => state.cart.quantity);

  const navigate = useNavigate();

  //hàm click vào nút +
  const increaseHandler = e => {
    e.preventDefault();
    dispatch(cartActions.updateCart({ method: 'increase' }));
  };

  //hàm click vào nút -
  const decreaseHandler = e => {
    e.preventDefault();
    dispatch(cartActions.updateCart({ method: 'decrease' }));
  };

  //hàm click vào nút Add cart
  const addCartHandler = e => {
    e.preventDefault();
    const addCartRes = data => {
      alert('Cart Added');
      navigate('/shop');
    };
    addCart(
      {
        url: `${process.env.REACT_APP_API_URL}/add-cart`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { productId: product._id, quantity },
      },
      addCartRes
    );
  };

  useEffect(() => {
    //khi người dùng rời trang sẽ đưa quantity về 1
    dispatch(cartActions.resetQuantity());
  }, [dispatch]);

  return (
    <Fragment>
      {error ? (
        <ServerError error={error} />
      ) : (
        <Fragment>
          <div className={classes.detail}>
            <div className={classes.detailImage}>
              <img src={product.img1} alt='Detail' />
              <img src={product.img2} alt='Detail' />
              <img src={product.img3} alt='Detail' />
              <img src={product.img4} alt='Detail' />
            </div>
            <img src={product.img1} alt='Detail' />
            <div className={classes.detailInfo}>
              <h2>{product.name}</h2>
              <p className={classes.price}>
                {Number(product.price).toLocaleString()} VND
              </p>
              <p className={classes.desc}>{product.short_desc}</p>
              <p>
                <b>CATEGORY: </b>
                {product.category}
              </p>
              <p>
                <b>STATUS: </b>
                {product.inventory > 0
                  ? `${product.inventory} products left`
                  : 'Out of stock'}
              </p>
              {isLoggedIn ? (
                <div className={classes.addCart}>
                  <p>QUANTITY</p>
                  <div className={classes.actions}>
                    <button onClick={decreaseHandler}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseHandler}>+</button>
                  </div>
                  <button
                    onClick={addCartHandler}
                    disabled={product.inventory === 0 || loading ? true : false}
                  >
                    {loading ? (
                      <Fragment>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          transform='left-10'
                          spin
                        />
                        Loading
                      </Fragment>
                    ) : (
                      'Add to cart'
                    )}
                  </button>
                </div>
              ) : (
                <span>
                  Please <Link to={'/login'}>Login</Link> to Add Cart
                </span>
              )}
            </div>
          </div>
          <div className={classes.description}>
            <button className='btn'>DESCRIPTION</button>
            <h4>PRODUCT DESCRIPTION</h4>
            <p>{product.long_desc}</p>
          </div>
          <div className={classes.related}>
            <h4>RELATED PRODUCTS</h4>
            <div className={classes.relatedProducts}>
              {props.products.map(data =>
                data.category === product.category ? (
                  <div className={classes.relatedProductsDetail}>
                    <img src={data.img1} alt='RelatedProducts' />
                    <p className={classes.name}>{data.name}</p>
                    <p className={classes.price}>
                      {Number(data.price).toLocaleString()} VND
                    </p>
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
