import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

import classes from './CartTableList.module.css';

import useHttp from '../../hooks/use-https';

const CartTableList = props => {
  const { loading, sendRequest: requestHandler, error } = useHttp();

  const product = props.product;
  const quantity = props.quantity;
  const itemPos = props.pos;

  const dispatch = useDispatch();
  //lấy vị trí

  //hàm click vào nút +
  const increaseHandler = e => {
    e.preventDefault();
    //vì khi truyền itemPos là 0 sẽ lỗi không có data
    dispatch(
      cartActions.updateCart({ method: 'increase', itemPos: itemPos + 1 })
    );
    const updateCartHandler = data => {};
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/update-cart`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { productId: product._id, updateMethod: 'increase' },
      },
      updateCartHandler
    );
  };

  //hàm click vào nút -
  const decreaseHandler = e => {
    e.preventDefault();
    dispatch(
      cartActions.updateCart({ method: 'decrease', itemPos: itemPos + 1 })
    );
    const updateCartHandler = data => {};
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/update-cart`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { productId: product._id, updateMethod: 'decrease' },
      },
      updateCartHandler
    );
  };

  //hàm delete
  const deleteHandler = e => {
    e.preventDefault();
    dispatch(cartActions.deleteCart({ itemPos: itemPos + 1 }));
    const deleteCartNotify = data => {};
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/delete-cart`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { productId: product._id },
      },
      deleteCartNotify
    );
  };

  useEffect(() => {
    if (error) {
      props.deleteErrorHandler(error);
    }
  }, [error, props]);

  return (
    <Fragment>
      <tr>
        <td className={classes.cartImg}>
          <img src={product.img1} alt='Cart List' />
        </td>
        <td className={classes.name}>
          <h3>{product.name}</h3>
        </td>
        <td>{Number(product.price).toLocaleString()} VND</td>
        {/* chỉnh sửa số lượng sản phẩm */}
        <td className={classes.actions}>
          <button
            onClick={decreaseHandler}
            disabled={quantity === 1 ? true : loading ? true : false}
          >
            -
          </button>
          <span>{quantity}</span>
          <button onClick={increaseHandler} disabled={loading ? true : false}>
            +
          </button>
        </td>
        <td>{(product.price * quantity).toLocaleString()} VND</td>
        {/* nút delete */}
        <td className={classes.actions}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            onClick={deleteHandler}
          >
            <path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z' />
          </svg>
        </td>
      </tr>
    </Fragment>
  );
};

export default CartTableList;
