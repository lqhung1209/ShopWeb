const Product = require('../models/product');

// const io = require('../socket');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.items.productId');
    const cartItems = user.cart.items;
    res.status(200).json({ cartItems });
  } catch (err) {
    res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postAddCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findById(prodId);
    if (product) {
      res.status(200).json({ msg: 'Cart Added' });
      return req.user.addToCart(req.body);
    }
  } catch (err) {
    res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postUpdateCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findById(prodId);
    if (product) {
      res.status(200).json({ msg: 'Cart Updated' });
      return req.user.updateCart(req.body);
    }
  } catch (err) {
    res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postDeleteCartItem = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    res.status(200).json({ msg: 'Cart Deleted' });
    return req.user.removeFromCart(prodId);
  } catch (err) {
    res.status(500).json({
      msg: 'server-error',
    });
  }
};
