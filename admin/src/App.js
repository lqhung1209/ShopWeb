import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Auth from './components/auth/Auth';
import DashboardPage from './pages/main/Dashboard';
// import UserPage from './pages/lists/UserPage';
import ProductPage from './pages/lists/ProductPage';
import NewProduct from './pages/new/NewProduct';
import ChatForm from './components/chat/ChatForm';

import NotAuthenticatedPage from './components/error/NotAuthenticatedPage';
import PageNotFound from './components/error/PageNotFound';
import LoadingPage from './components/loading/LoadingPage';

import useCheckAuth from './hooks/check-auth';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';

function App() {
  const { loading, sendRequest: getUser } = useCheckAuth();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  useEffect(() => {
    // check người dùng đã đăng nhập chưa
    const getUserInfo = data => {
      dispatch(authActions.onAuth(data));
    };
    getUser(
      {
        url: `${process.env.REACT_APP_API_URL}/admin/user`,
      },
      getUserInfo
    );
  }, [getUser, dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        {loading ? (
          <LoadingPage />
        ) : (
          <Routes>
            <Route
              exact
              path='/'
              element={isLoggedIn ? <DashboardPage /> : <Auth />}
            />
            {isLoggedIn ? (
              <React.Fragment>
                {/* <Route path='/user' element={<UserPage />} /> */}
                {isAdmin && (
                  <React.Fragment>
                    <Route path='/product' element={<ProductPage />} />
                    <Route path='/product/add-new' element={<NewProduct />} />
                  </React.Fragment>
                )}
                <Route path='/chat-room/' element={<ChatForm />} />
                <Route path='/chat-room/:roomId' element={<ChatForm />} />
                <Route path='*' element={<PageNotFound />} />
              </React.Fragment>
            ) : (
              <Route path='*' element={<NotAuthenticatedPage />} />
            )}
          </Routes>
        )}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
