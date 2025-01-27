const express = require('express');

const { body } = require('express-validator');

const orderController = require('../controllers/order');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
  '/add-order',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('phone', 'Phone max 10 numbers.')
      .isLength({ max: 10 })
      .isNumeric()
      .trim(),
  ],
  isAuth,
  orderController.postAddOrder
);

router.get('/order', isAuth, orderController.getOrders);

module.exports = router;
