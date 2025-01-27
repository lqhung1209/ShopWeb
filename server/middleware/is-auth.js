const User = require('../models/user');

module.exports = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ status: 401, msg: 'Not authenticated.' });
  }
  try {
    const user = await User.findById(req.session.user._id);
    if (user) {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      msg: 'server-error',
    });
  }
};
