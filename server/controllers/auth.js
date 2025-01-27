const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const password = req.body.password;
  const phone = req.body.phone;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 422,
      msg: errors.array()[0].msg,
    });
  }
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      fullname: fullname,
      password: hashedPw,
      phone: phone,
      cart: { items: [] },
      isAdmin: false,
      isCounselor: false,
    });
    const result = await user.save();
    return res.json({ status: 201, msg: 'User Created!', userId: result._id });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 422,
      msg: errors.array()[0].msg,
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ status: 401, msg: 'Email or Password Incorrect' });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.json({ status: 401, msg: 'Email or Password Incorrect' });
    }
    req.session.user = user;
    const saveSession = await req.session.save();
    return res.json({
      status: 200,
      msg: 'Login Success!',
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postAdminLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 422,
      msg: errors.array()[0].msg,
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ status: 401, msg: 'Email or Password Incorrect' });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.json({ status: 401, msg: 'Email or Password Incorrect' });
    }
    if (!user.isAdmin && !user.isCounselor) {
      return res.json({ status: 401, msg: 'You have no permission' });
    }
    req.session.user = user;
    const saveSession = await req.session.save();
    return res.json({
      status: 200,
      msg: 'Login Success!',
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.userInfo = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 200,
      isLoggedIn: true,
      user: req.user.fullname,
      isAdmin: req.user.isAdmin,
      isCounselor: req.user.isCounselor,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.status(200).json({ msg: 'Logout Success!' });
  });
};
