import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LoadingButton from '../loading/LoadingButton';
// import ServerError from '../error/ServerErrorPage';

import { Button, Row, Col, Form, Alert } from 'react-bootstrap';

import useHttp from '../../hooks/use-https';

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { loading, sendRequest: requestHandler, error } = useHttp();

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  const [nameValue, setNameValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [shortDescValue, setShortDescValue] = useState('');
  const [longDescValue, setLongDescValue] = useState('');
  const [inventoryValue, setInventoryValue] = useState('');
  const imageRef = useRef();

  //nhận input
  const nameChangeHandler = e => setNameValue(e.target.value);
  const categoryChangeHandler = e => setCategoryValue(e.target.value);
  const priceChangeHandler = e => setPriceValue(e.target.value);
  const shortDescChangeHandler = e => setShortDescValue(e.target.value);
  const longDescChangeHandler = e => setLongDescValue(e.target.value);
  const inventoryChangeHandler = e => setInventoryValue(e.target.value);

  const showAlertHandler = msg => {
    setShow(true);
    setMsg(msg);
    setTimeout(function () {
      setShow(false);
    }, 5000);
  };

  const submitHandler = event => {
    event.preventDefault();
    //validate input rỗng
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const imageValue = imageRef.current.files;
      const formData = new FormData();
      formData.append('name', nameValue);
      formData.append('category', categoryValue);
      formData.append('price', priceValue);
      formData.append('short_desc', shortDescValue);
      formData.append('long_desc', longDescValue);
      formData.append('inventory', inventoryValue);
      formData.append('images_length', imageValue.length);
      // tải từ 1 - 5 image
      for (let i = 0; i < imageValue.length; i++) {
        formData.append('images', imageValue[i]);
      }
      const addProductHandler = data => {
        if (data.status === 200 || data.status === 201) {
          alert('Add Product Success');
          navigate('/product');
        } else {
          showAlertHandler(data.msg);
        }
      };
      requestHandler(
        {
          url: `${process.env.REACT_APP_API_URL}/admin/add-product`,
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          formData: true,
          data: formData,
        },
        addProductHandler
      );
    }
    setValidated(true);
  };

  useEffect(() => {
    if (error) {
      showAlertHandler(error);
    }
  }, [error]);

  return (
    <React.Fragment>
      {/* {error ? (
        <ServerError error={error} />
      ) : ( */}
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <h3 className='mt-3 mb-3'>Add New Product</h3>
        {show && (
          <Alert variant='danger' onClose={() => setShow(false)} dismissible>
            {msg}
          </Alert>
        )}
        <Row className='mb-3'>
          <Col xs={4}>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Product name'
                onChange={nameChangeHandler}
                value={nameValue}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type='number'
                placeholder='At least 1000 VND'
                onChange={priceChangeHandler}
                value={priceValue}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Upload Image (5 Image)</Form.Label>
              <Form.Control
                type='file'
                ref={imageRef}
                name='image'
                id='image'
                multiple
              />
            </Form.Group>
          </Col>
          <Col xs={{ span: 4, offset: 3 }}>
            <Form.Group className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Category'
                onChange={categoryChangeHandler}
                value={categoryValue}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Inventory</Form.Label>
              <Form.Control
                required
                type='number'
                placeholder='At least 1'
                onChange={inventoryChangeHandler}
                value={inventoryValue}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                required
                as='textarea'
                rows={2}
                placeholder='Short Description'
                onChange={shortDescChangeHandler}
                value={shortDescValue}
              />
            </Form.Group>
          </Col>
          <Col xs={11}>
            <Form.Group className='mb-2'>
              <Form.Label>Long Description</Form.Label>
              <Form.Control
                required
                as='textarea'
                rows={3}
                placeholder='Long Description'
                onChange={longDescChangeHandler}
                value={longDescValue}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type='submit' disabled={loading ? true : false}>
          {loading ? <LoadingButton /> : 'Send'}
        </Button>
      </Form>
      {/* )} */}
    </React.Fragment>
  );
};

export default AddNewProduct;
