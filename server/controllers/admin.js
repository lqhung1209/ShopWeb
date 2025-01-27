const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

const { validationResult } = require('express-validator');

const fileHelper = require('../util/file');

exports.getDashboard = async (req, res, next) => {
  //chỉ có admin mới xem được
  if (!req.user.isAdmin) {
    return res.status(401).json({ status: 401, msg: 'Not authenticated.' });
  }
  try {
    //lấy orders
    const orders = await Order.find();
    //lấy những orders chưa được hoàn thành
    const newOrders = orders.filter(e => e.status === false);

    //lấy danh sách order đã xử lý xong
    const ordersHandlered = orders.filter(e => e.status === true);
    let pricePerMonth = 0;
    if (ordersHandlered.length > 0) {
      //tính tổng tiền
      const totalPrice = ordersHandlered.reduce(
        (acc, cur) => acc + cur.total,
        0
      );
      //lấy vị trí cuối của mảng
      const lastPos = ordersHandlered.length - 1;
      //date đầu và cuối cùng trong mảng
      const firstDate = new Date(ordersHandlered[0].dateCreated);
      const lastDate = new Date(ordersHandlered[lastPos].dateCreated);
      //lấy month/year của date đầu
      const firstMonth = firstDate.toLocaleString('en-US', {
        month: '2-digit',
      });

      const firstYear = firstDate.getFullYear();
      //lấy month/year của date cuối
      const lastMonth = lastDate.toLocaleString('en-US', {
        month: '2-digit',
      });
      const lastYear = lastDate.getFullYear();
      //hiệu số giữa 2 month và year
      const monthDiff = lastMonth - firstMonth;
      const yearDiff = lastYear - firstYear;
      //tổng tháng
      const totalMonth = (monthDiff === 0 ? 1 : monthDiff) + yearDiff * 12;
      pricePerMonth = totalPrice / totalMonth;
    }

    //lấy users
    const users = await User.find();
    return res.status(200).json({
      orders: newOrders,
      countOrders: newOrders.length,
      clients: users.length,
      price: pricePerMonth,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  //chỉ có admin mới xem được
  if (!req.user.isAdmin) {
    return res.status(401).json({ status: 401, msg: 'Not authenticated.' });
  }
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postAddProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ status: 401, msg: 'Not authenticated.' });
  }
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const inventory = req.body.inventory;
  const images_length = Number(req.body.images_length);
  const images = req.files;
  //nếu ít hoặc nhiều hơn t image
  if (images_length !== 5) {
    //không có image
    if (images_length === 0) {
      return res.json({
        msg: 'Attached file is null.',
        status: 422,
      });
    }
    for (let i = 0; i < images_length; i++) {
      fileHelper.deleteFile(images[i].path);
    }
    return res.json({
      status: 422,
      msg: 'Please upload 5 images!',
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (let i = 0; i < (images_length > 5 ? 5 : images_length); i++) {
      fileHelper.deleteFile(images[i].path);
    }
    return res.json({
      status: 422,
      msg: errors.array()[0].msg,
    });
  }
  try {
    const product = new Product({
      name: name,
      category: category,
      price: price,
      short_desc: short_desc,
      long_desc: long_desc,
      img1: images[0].path,
      img2: images[1].path,
      img3: images[2].path,
      img4: images[3].path,
      img5: images[4].path,
      inventory: inventory,
    });
    const result = await product.save();
    return res.status(200).json({ status: 200, msg: 'Success' });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postEditProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ status: 401, msg: 'Not authenticated.' });
  }
  const productId = req.body.productId;
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const inventory = req.body.inventory;
  const images_length = Number(req.body.images_length);
  const images = req.files;
  //nếu ít hoặc nhiều hơn t image (hơn 0)
  if (images_length > 0 && images_length !== 5) {
    for (let i = 0; i < images_length; i++) {
      fileHelper.deleteFile(images[i].path);
    }
    return res.json({
      status: 422,
      msg: 'Please upload 5 images!',
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //nếu nhập lỗi thì xóa images
    if (images_length !== 0) {
      for (let i = 0; i < (images_length > 5 ? 5 : images_length); i++) {
        fileHelper.deleteFile(images[i].path);
      }
    }
    return res.json({
      status: 422,
      msg: errors.array()[0].msg,
    });
  }
  try {
    const product = await Product.findById(productId);
    product.name = name;
    product.category = category;
    product.price = price;
    product.short_desc = short_desc;
    product.long_desc = long_desc;
    product.inventory = inventory;
    //nếu admin muốn đổi image
    if (images_length === 5) {
      //tạo list array của img path
      const imgListPre = [
        product.img1,
        product.img2,
        product.img3,
        product.img4,
        product.img5,
      ];
      //chỉ lấy các image được insert từ input
      const imgList = imgListPre
        .filter(e => e !== undefined)
        .filter(e => e.includes('images'));
      //xóa các img lưu trong folder
      if (imgList.length > 0) {
        for (let i = 0; i < imgList.length; i++) {
          fileHelper.deleteFile(imgList[i]);
        }
      }
      product.img1 = images[0].path;
      product.img2 = images[1].path;
      product.img3 = images[2].path;
      product.img4 = images[3].path;
      product.img5 = images[4].path;
    }
    const result = await product.save();
    return res.status(200).json({ status: 200, msg: 'Edit Product Success!' });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ status: 401, msg: 'Not authenticated.' });
  }
  const productId = req.body.productId;
  try {
    const product = await Product.findByIdAndRemove(productId);
    //tạo list array của img path
    const imgListPre = [
      product.img1,
      product.img2,
      product.img3,
      product.img4,
      product.img5,
    ];
    //chỉ lấy các image được insert từ input
    const imgList = imgListPre
      .filter(e => e !== undefined)
      .filter(e => e.includes('images'));
    //xóa các img lưu trong folder
    if (imgList.length > 0) {
      for (let i = 0; i < imgList.length; i++) {
        fileHelper.deleteFile(imgList[i]);
      }
    }
    return res.status(200).json({ msg: 'Delete Product Success!' });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};
