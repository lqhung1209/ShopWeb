import React, { useState, useRef, useEffect } from 'react';

import LoadingButton from '../loading/LoadingButton';

import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';

import useHttp from '../../hooks/use-https';

const EditProductForm = props => {
  const productData = props.productData;

  const { loading, error, sendRequest: postEditProduct } = useHttp();

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  const [nameValue, setNameValue] = useState(productData.name);
  const [categoryValue, setCategoryValue] = useState(productData.category);
  const [priceValue, setPriceValue] = useState(productData.price);
  const [shortDescValue, setShortDescValue] = useState(productData.short_desc);
  const [longDescValue, setLongDescValue] = useState(productData.long_desc);
  const [inventoryValue, setInventoryValue] = useState(productData.inventory);
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
      formData.append('productId', productData._id);
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
      const editProductNotify = data => {
        if (data.status === 200 || data.status === 201) {
          props.close();
          props.showAlertHandler(data.msg);
        } else {
          showAlertHandler(data.msg);
        }
      };
      postEditProduct(
        {
          url: `${process.env.REACT_APP_API_URL}/admin/edit-product`,
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          formData: true,
          data: formData,
        },
        editProductNotify
      );
    }
    setValidated(true);
  };

  useEffect(() => {
    if (error) {
      props.showErrorHandler(error);
    }
  }, [error, props]);

  return (
    <React.Fragment>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Modal.Body>
          {show && (
            <Alert variant='danger' onClose={() => setShow(false)} dismissible>
              {msg}
            </Alert>
          )}
          <Row className='mb-2'>
            <Col xs={8}>
              <Form.Group className='mb-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Product name'
                  onChange={nameChangeHandler}
                  value={nameValue}
                />
              </Form.Group>
              <Form.Group className='mb-3 w-75'>
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
            <Col xs={4}>
              <Form.Group className='mb-2'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Price'
                  onChange={priceChangeHandler}
                  value={priceValue}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Price'
                  onChange={categoryChangeHandler}
                  value={categoryValue}
                />
              </Form.Group>
            </Col>
            <Col xs={9}>
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
            <Col xs={1} />
            <Col xs={2}>
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
            </Col>
            <Col xs={12}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.close}>
            Close
          </Button>
          <Button
            variant='info'
            type='submit'
            disabled={loading ? true : false}
          >
            {loading ? <LoadingButton /> : 'Edit'}
          </Button>
        </Modal.Footer>
      </Form>
    </React.Fragment>
  );
};

export default EditProductForm;
