import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

import EditProductForm from './EditProductForm';

const EditProduct = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Button variant='outline-info' onClick={handleShow}>
        Edit
      </Button>
      <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.productData.name}</Modal.Title>
        </Modal.Header>
        <EditProductForm
          close={handleClose}
          productData={props.productData}
          showAlertHandler={props.showAlertHandler}
          showErrorHandler={props.showErrorHandler}
        />
      </Modal>
    </React.Fragment>
  );
};

export default EditProduct;
