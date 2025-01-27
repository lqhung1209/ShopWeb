import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './CartTable.module.css';
import CartTableList from './CartTableList';
import CartTotal from './CartTotal';
import ServerError from '../error/ServerErrorPage';

import useHttp from '../../hooks/use-https';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

const CartTable = () => {
  const { loading, sendRequest: requestHandler, error } = useHttp();

  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // //lấy dữ liệu cart store
  const cartAdded = useSelector(state => state.cart.quantityAdded);

  //hàm xử lý Delete Item
  const deleteErrorHandler = msg => {
    setDeleteErrorMsg(msg);
    setDeleteError(true);
  };

  useEffect(() => {
    //lấy dữ liệu cart của user
    const getCartData = data => {
      dispatch(cartActions.getCart(data.cartItems));
    };
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/cart`,
      },
      getCartData
    );
  }, [requestHandler, dispatch]);

  return (
    <Fragment>
      {/* lấy data cart lỗi */}
      {error ? (
        <ServerError error={error} />
      ) : // xóa product lỗi
      deleteError ? (
        <ServerError error={deleteErrorMsg} />
      ) : (
        <Fragment>
          <h2>SHOPPING CART</h2>
          <div className={classes.cartTable}>
            {/* Bảng Cart */}
            <table>
              {/* đang tải data */}
              {!cartAdded || loading ? (
                <h1>Please waiting ........</h1>
              ) : // tải xong data hoặc nếu là tải lại lúc delete
              cartAdded.length > 0 ? (
                <Fragment>
                  <tr>
                    <th>IMAGE</th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>REMOVE</th>
                  </tr>
                  {/* hiển thị bảng các sản phẩm được add */}
                  {cartAdded.map((e, i) => (
                    <CartTableList
                      key={e._id}
                      id={e._id}
                      product={e.productId}
                      quantity={e.quantity}
                      pos={i}
                      deleteErrorHandler={deleteErrorHandler}
                    />
                  ))}
                </Fragment>
              ) : (
                <h1>No Products in Cart</h1>
              )}
            </table>
            {/* Bảng Cart Total */}
            <CartTotal />
          </div>
          {/* 2 nút tương tác sang page */}
          <div className={classes.cartActionPage}>
            {/* quay về Shop */}
            <button onClick={() => navigate('/shop', { replace: false })}>
              <span>&larr;</span> Continue shopping
            </button>
            {/* chuyển sang trang Checkout để hoàn tất đặt hàng */}
            <button
              className={classes.border}
              onClick={() => navigate('/checkout', { replace: false })}
            >
              Process to checkout <span>&rarr;</span>
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartTable;
