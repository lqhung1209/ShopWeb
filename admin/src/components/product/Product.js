import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LoadingPage from '../loading/LoadingPage';
import ServerError from '../error/ServerErrorPage';

import { Container, Table, Button, Row, Col, Alert } from 'react-bootstrap';

import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

import useHttp from '../../hooks/use-https';

const Product = () => {
  const navigate = useNavigate();

  const { loading, error, sendRequest: fetchProductData } = useHttp();
  const [productData, setProductData] = useState();

  const [show, setShow] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [errorHandler, setErrorHandler] = useState(false);

  useEffect(() => {
    const fetchData = data => {
      setProductData(data);
    };
    fetchProductData(
      { url: `${process.env.REACT_APP_API_URL}/admin/product` },
      fetchData
    );
  }, [fetchProductData]);

  const showAlertHandler = msg => {
    setShow(true);
    setMessageAlert(msg);
    window.scrollTo(0, 0);
    setTimeout(function () {
      setShow(false);
      const fetchData = data => {
        setProductData(data);
      };
      fetchProductData(
        { url: `${process.env.REACT_APP_API_URL}/admin/product` },
        fetchData
      );
    }, 2000);
  };

  const showErrorHandler = () => {
    setErrorHandler(true);
  };

  return (
    <Container className='mt-5'>
      {/* alert */}
      {show && (
        <Alert variant='success' onClose={() => setShow(false)} dismissible>
          {messageAlert}
        </Alert>
      )}
      {/* phần đầu */}
      <Row>
        <Col>
          <h3>Products List</h3>
        </Col>
        <Col>
          <Button
            onClick={() => {
              navigate('/product/add-new');
            }}
            variant='outline-success'
            style={{ float: 'right' }}
          >
            Add New
          </Button>
        </Col>
      </Row>
      {/* tải data */}
      {error || errorHandler ? (
        <ServerError error={error ? error : errorHandler} />
      ) : loading ? (
        <LoadingPage />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <input type='checkbox' />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productData
              ? productData.map(e => (
                  <tr>
                    <td>
                      <input type='checkbox' />
                    </td>
                    <td>{e._id}</td>
                    <td>{e.name}</td>
                    <td>{Number(e.price).toLocaleString()} VND</td>
                    <td>
                      <img
                        src={
                          e.img1.slice(0, 7).includes('images')
                            ? `${process.env.REACT_APP_API_URL}/${e.img1}`
                            : e.img1
                        }
                        alt=''
                        width='100'
                      />
                      {/* <img src={`${e.img1}`} alt='' width='100' /> */}
                    </td>
                    <td>{e.category}</td>
                    <td>
                      <Row>
                        <Col>
                          <EditProduct
                            productData={e}
                            showAlertHandler={showAlertHandler}
                            showErrorHandler={showErrorHandler}
                          />
                        </Col>
                        <Col>
                          <DeleteProduct
                            productId={e._id}
                            productName={e.name}
                            showAlertHandler={showAlertHandler}
                            showErrorHandler={showErrorHandler}
                          />
                        </Col>
                      </Row>
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

export default Product;
