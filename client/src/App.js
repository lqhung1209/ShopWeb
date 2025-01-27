import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import OrderDetail from './components/order/OrderDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPopup from './components/chat/ChatPopup';

import Loading from './components/loading/LoadingPage';
import ServerError from './components/error/ServerErrorPage';
import PageNotFound from './components/error/PageNotFound';

import useHttp from './hooks/use-https';
import useCheckAuth from './hooks/check-auth';

import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';

function App() {
  const [products, setProducts] = useState([]);
  const { loading, sendRequest: getProducts, error } = useHttp();
  const { sendRequest: getUser } = useCheckAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    // check người dùng đã đăng nhập chưa
    const getUserInfo = data => {
      dispatch(authActions.onAuth(data));
    };
    getUser(
      {
        url: `${process.env.REACT_APP_API_URL}/user`,
      },
      getUserInfo
    );
    //lấy data của shop
    const getProductsData = data => {
      setProducts(data);
    };
    getProducts(
      {
        url: `${process.env.REACT_APP_API_URL}/products`,
      },
      getProductsData
    );
  }, [getUser, getProducts, dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        {loading ? (
          <Loading />
        ) : !error ? (
          <Routes>
            <Route exact path='/' element={<Home products={products} />} />
            <Route path='/shop' element={<Shop products={products} />} />
            <Route
              path='/detail/:productId'
              element={<Detail products={products} />}
            />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order-detail/:orderId' element={<OrderDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        ) : (
          <ServerError error={error} />
        )}
      </Layout>
      <ChatPopup />
    </BrowserRouter>
  );
}

export default App;
