import React, { useEffect, useState } from 'react';

import TransactionBoard from './NewOrderBoard';
import InfoBoard from './InfoBoard';
import ServerError from '../error/ServerErrorPage';

import { Container } from 'react-bootstrap';

import useHttp from '../../hooks/use-https';

import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { error, sendRequest: requestHandler, loading } = useHttp();

  const isAdmin = useSelector(state => state.auth.isAdmin);

  const [countClient, setCountClient] = useState('');
  const [totalPricePerMonth, setTotalPricePerMonth] = useState('');
  const [countNewOrder, setCountNewOrder] = useState('');
  const [newOrder, setNewOrder] = useState([]);

  useEffect(() => {
    const fetchData = data => {
      setCountClient(data.clients);
      setTotalPricePerMonth(data.price);
      setCountNewOrder(data.countOrders);
      setNewOrder(data.orders);
    };
    requestHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/admin/dashboard`,
      },
      fetchData
    );
  }, [requestHandler]);

  return (
    <Container className='mt-4'>
      {isAdmin ? (
        error ? (
          <ServerError error={error} />
        ) : (
          <React.Fragment>
            <InfoBoard
              clients={countClient}
              price={totalPricePerMonth}
              orders={countNewOrder}
            />
            <TransactionBoard data={newOrder} loading={loading} />
          </React.Fragment>
        )
      ) : (
        <h1 className='text-center'>Hello Counselor</h1>
      )}
    </Container>
  );
};

export default Dashboard;
