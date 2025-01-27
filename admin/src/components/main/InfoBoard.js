import React from 'react';

import { Row, Col, Card, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCartShopping,
  faCircleDollarToSlot,
  // faWallet,
} from '@fortawesome/free-solid-svg-icons';

const InfoBoard = props => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>CLIENTS</Card.Title>
              <Card.Text className='mt-4'>
                {props.clients ? props.clients : 0}
              </Card.Text>
              <Button variant='danger' style={{ float: 'right' }}>
                <FontAwesomeIcon icon={faUser} />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>EARNINGS THE MONTH</Card.Title>
              <Card.Text className='mt-4'>
                {props.price ? props.price.toLocaleString() : 0} VND{' '}
                {props.price === 0 ? '(No Order Done)' : ''}
              </Card.Text>
              <Button variant='warning' style={{ float: 'right' }}>
                <FontAwesomeIcon icon={faCartShopping} />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>NEW ORDERS</Card.Title>
              <Card.Text className='mt-4'>{props.orders}</Card.Text>
              <Button variant='success' style={{ float: 'right' }}>
                <FontAwesomeIcon icon={faCircleDollarToSlot} />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col>
          <Card>
            <Card.Body>
              <Card.Title>BALANCE</Card.Title>
              <Card.Text className='mt-4'>$ {totalPricePerMonth}</Card.Text>
              <Button variant='info' style={{ float: 'right' }}>
                <FontAwesomeIcon icon={faWallet} />
              </Button>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </React.Fragment>
  );
};

export default InfoBoard;
