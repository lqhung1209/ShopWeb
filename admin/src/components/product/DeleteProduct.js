import React, { useState, useRef } from 'react';

import LoadingButton from '../loading/LoadingButton';

import { Button, Modal, Form } from 'react-bootstrap';

import useHttp from '../../hooks/use-https';

const DeleteProduct = props => {
  const idRef = useRef();
  const { loading, error, sendRequest: deleteHandler } = useHttp();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = e => {
    e.preventDefault();
    const productId = idRef.current.value;
    const getNotify = data => {
      handleClose();
      props.showAlertHandler(data.msg);
    };
    deleteHandler(
      {
        url: `${process.env.REACT_APP_API_URL}/admin/delete-product`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { productId: productId },
      },
      getNotify
    );
  };

  if (error) {
    props.showErrorHandler(error);
  }

  return (
    <React.Fragment>
      <Button variant='outline-danger' onClick={handleShow}>
        Delete
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Form onSubmit={submitHandler}>
            <Form.Control type='hidden' ref={idRef} value={props.productId} />
            <Button
              variant='danger'
              type='submit'
              disabled={loading ? true : false}
            >
              {loading ? <LoadingButton /> : 'Delete'}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteProduct;
