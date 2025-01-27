const express = require('express');

const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const isAuth = require('../middleware/is-auth');
const isAdminAuth = require('../middleware/is-auth-admin');

const router = express.Router();

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body('fullname', 'Full name least 5 characters').isLength({ min: 5 }),
    body(
      'password',
      'Password only numbers and text and at least 8 characters.'
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body('phone', 'Phone have 10 numbers').isLength({
      min: 10,
      max: 10,
    }),
  ],
  authController.postSignup
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body(
      'password',
      'Password only numbers and text and at least 8 characters.'
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  '/admin/login',
  [
    body('email')
      .isEmail()
      .withMessage('Email or Password Incorrect.')
      .normalizeEmail(),
    body('password', 'Email or Password Incorrect.')
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postAdminLogin
);

router.get('/user', isAuth, authController.userInfo);

router.get('/admin/user', isAdminAuth, authController.userInfo);

router.get('/logout', isAuth, authController.postLogout);

module.exports = router;
