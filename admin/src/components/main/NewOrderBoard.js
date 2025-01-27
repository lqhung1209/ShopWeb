import React from 'react';

import { Container, Table, Button } from 'react-bootstrap';

const NewOrderBoardBoard = props => {
  const data = props.data;

  //xử lí hiển thị cột date
  // const dateHandler = date => {
  //   const getDate = new Date(date);
  //   const day = getDate.toLocaleString('en-US', { day: '2-digit' });
  //   const month = getDate.toLocaleString('en-US', {
  //     month: '2-digit',
  //   });
  //   const year = getDate.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  return (
    <Container className='mt-5'>
      <h3>Latest New Orders</h3>
      {props.loading ? (
        <h1 className='text-center'>Data is loading ........</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <input type='checkbox' />
              </th>
              <th>ID User</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map(e => (
                  <tr>
                    <td>
                      <input type='checkbox' />
                    </td>
                    <td>{e.creator}</td>
                    <td>{e.fullname}</td>
                    <td>{e.phone}</td>
                    <td>{e.address}</td>
                    <td>{e.total.toLocaleString()}</td>
                    <td>{e.delivery ? 'Đã vận chuyển' : 'Chưa vận chuyển'}</td>
                    <td>{e.status ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                    <td>
                      <Button variant='success'>View</Button>
                    </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default NewOrderBoardBoard;
