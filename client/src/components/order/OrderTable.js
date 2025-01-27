import { Fragment, useEffect, useState } from 'react';

import OrderTableList from './OrderTableList';
import ServerError from '../error/ServerErrorPage';
import classes from './OrderTable.module.css';

import useHttp from '../../hooks/use-https';

const OrderTable = () => {
  const { loading, sendRequest: requestHandler, error } = useHttp();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    //lấy dữ liệu order của user
    const getOrderData = data => {
      setOrderData(data.orders);
    };
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/order`,
      },
      getOrderData
    );
  }, [requestHandler]);

  return (
    <Fragment>
      {/* lấy data order lỗi */}
      {error ? (
        <ServerError error={error} />
      ) : (
        <Fragment>
          <div className={classes.orderTable}>
            {/* Bảng order */}
            <table>
              {/* đang tải data */}
              {!orderData || loading ? (
                <h1>Please waiting ........</h1>
              ) : // tải xong data hoặc nếu là tải lại lúc delete
              orderData.length > 0 ? (
                <Fragment>
                  <tr>
                    <th>ID ORDER</th>
                    <th>ID USER</th>
                    <th>NAME</th>
                    <th>PHONE</th>
                    <th>ADDRESS</th>
                    <th>TOTAL</th>
                    <th>DELIVERY</th>
                    <th>STATUS</th>
                    <th>DETAIL</th>
                  </tr>
                  {/* hiển thị bảng các sản phẩm được add */}
                  {orderData.map((e, i) => (
                    <OrderTableList key={e._id} order={e} />
                  ))}
                </Fragment>
              ) : (
                <h1>No Orders in Here</h1>
              )}
            </table>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderTable;
