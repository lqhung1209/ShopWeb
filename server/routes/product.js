const express = require('express');

const productController = require('../controllers/product');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/products', productController.getAllProducts);

router.get('/cart', isAuth, productController.getCart);

router.post('/add-cart', isAuth, productController.postAddCart);

router.post('/delete-cart', isAuth, productController.postDeleteCartItem);

router.post('/update-cart', isAuth, productController.postUpdateCart);

module.exports = router;
