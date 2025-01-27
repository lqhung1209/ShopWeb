const express = require('express');

const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAdminAuth = require('../middleware/is-auth-admin');

const router = express.Router();

router.get('/dashboard', isAdminAuth, adminController.getDashboard);

router.get('/product', isAdminAuth, adminController.getAllProducts);

router.post(
  '/add-product',
  [
    body('price', 'Price at least 1000.').isLength({ min: 4 }).not().isEmpty(),
    body('name', 'Name at least 6 characters.')
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    body('category', 'Category at least 3 characters.')
      .isLength({ min: 3 })
      .not()
      .isEmpty(),
    body('short_desc', 'Short description at least 10 characters.')
      .isLength({
        min: 10,
      })
      .not()
      .isEmpty(),
    body('long_desc', 'Long description at least 10 characters.')
      .isLength({
        min: 10,
      })
      .not()
      .isEmpty(),
    body('inventory', 'Inventory is number.').isNumeric().not().isEmpty(),
  ],
  isAdminAuth,
  adminController.postAddProduct
);

router.post(
  '/edit-product',
  [
    body('price', 'Price at least 1000.').isLength({ min: 4 }).not().isEmpty(),
    body('name', 'Name at least 6 characters.')
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    body('category', 'Category at least 3 characters.')
      .isLength({ min: 3 })
      .not()
      .isEmpty(),
    body('short_desc', 'Short description at least 10 characters.')
      .isLength({
        min: 10,
      })
      .not()
      .isEmpty(),
    body('long_desc', 'Long description at least 10 characters.')
      .isLength({
        min: 10,
      })
      .not()
      .isEmpty(),
    body('inventory', 'Inventory is number.').isNumeric().not().isEmpty(),
  ],
  isAdminAuth,
  adminController.postEditProduct
);

router.post('/delete-product', isAdminAuth, adminController.postDeleteProduct);

module.exports = router;
