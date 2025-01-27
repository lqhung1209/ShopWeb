import React, { useState, useEffect } from 'react';

import { Container, Table } from 'react-bootstrap';

import useHttp from '../../hooks/use-https';

const User = () => {
  const { error, sendRequest: fetchUserData } = useHttp();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = data => {
      setUserData(data);
    };
    fetchUserData(
      { url: `${process.env.REACT_APP_API_URL}/products` },
      fetchData
    );
  }, [fetchUserData]);

  return (
    <Container className='mt-5'>
      {error}
      <h3>Users List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <th>ID</th>
            <th>Username</th>
            <th>Full name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {userData
            ? userData.map(e => (
                <tr>
                  <td>
                    <input type='checkbox' />
                  </td>
                  {/* <td>{e._id}</td>
                  <td>{e.username}</td>
                  <td>{e.fullname}</td>
                  <td>{e.phoneNumber}</td>
                  <td>{e.email}</td>
                  <td>{e.isAdmin === true ? 'Yes' : 'No'}</td> */}
                  <td>{e._id}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </Table>
    </Container>
  );
};

export default User;
