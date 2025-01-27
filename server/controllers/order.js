const Order = require('../models/order');
const Product = require('../models/product');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.SMPT_MAIL, pass: process.env.SMPT_PASSWORD },
});

const { validationResult } = require('express-validator');

exports.postAddOrder = async (req, res, next) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 422,
      msg: errors.array()[0].msg,
    });
  }
  try {
    const user = await req.user.populate('cart.items.productId');
    const products = user.cart.items.map(i => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });
    if (products.length === 0) {
      return res.json({ msg: 'Cart must contain at least 1 product' });
    }
    // tính tổng bill
    let totalBill = 0;
    products.map(e => (totalBill += e.product.price * e.quantity));
    const orderObject = {
      email: email,
      fullname: fullname,
      phone: phone,
      address: address,
      creator: req.user._id,
      total: totalBill,
      dateCreated: new Date(),
      delivery: false,
      status: false,
      products: products,
    };
    // lọc các id sản phẩm được order
    const orderQuantity = orderObject.products.map(e => {
      const temp = { id: e.product._id, quantity: e.quantity };
      return temp;
    });
    const orderIds = orderQuantity.map(e => e.id);
    const productInventoryChange = await Product.find({
      _id: { $in: orderIds },
    });
    //lấy inventory trừ số sản phẩm order
    productInventoryChange.map(e => {
      const temp = e;
      for (let i = 0; i < orderQuantity.length; i++) {
        if (temp._id.toString() === orderQuantity[i].id.toString()) {
          temp.inventory =
            Number(temp.inventory) - Number(orderQuantity[i].quantity);
        }
      }
      return temp;
    });
    //check xem có inventory bị trừ về âm không
    const checkOrder = productInventoryChange.filter(e => e.inventory < 0);
    if (checkOrder.length > 0) {
      return res.json({
        msg: `${checkOrder.length} product${
          checkOrder.length > 1 ? 's' : ''
        } in cart exceed the quantity in stock! Please check`,
      });
    }
    // update lại inventory
    for (let i = 0; i < productInventoryChange.length; i++) {
      const result = await Product.findById(productInventoryChange[i]);
      result.inventory = productInventoryChange[i].inventory;
      const saveInventory = await result.save();
    }
    //đổi số tiền thành vnd
    function formatCash(str) {
      return str
        .split('')
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + '.') + prev;
        });
    }
    const order = new Order(orderObject);
    const result = await order.save();
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: result.email,
      // to: 'hunglqfx18738@funix.edu.vn',
      subject: 'Thông tin đơn đặt hàng',
      html: ` <h1>Xin Chào ${result.fullname}\n\n</h1>
        <p>Phone: ${result.phone}\n</p>
        <p>Address: ${result.address}\n</p>
        <p>Ngày đặt hàng: ${new Date(result.dateCreated).toLocaleString(
          'en-US',
          { day: '2-digit' }
        )} - ${new Date(result.dateCreated).toLocaleString('en-US', {
        month: '2-digit',
      })} - ${new Date(result.dateCreated).getFullYear()}\n</p>
        <table style="border: 1px solid">
          <tr>
            <th style="border: 1px solid;">Tên sản phẩm</th>
            <th style="border: 1px solid;">Hình ảnh</th>
            <th style="border: 1px solid;">Giá</th>
            <th style="border: 1px solid;">Số lượng</th>
            <th style="border: 1px solid;">Thành tiền</th>
          </tr>
          ${result.products
            .map(
              e =>
                `<tr>
                <td style="border: 1px solid">${e.product.name}</td>
                <td style="border: 1px solid"><img src=${
                  e.product.img1
                } alt='Cart Image' width="100"></td>
                <td style="border: 1px solid">${formatCash(
                  e.product.price.toString()
                )} VND</td>
                <td style="border: 1px solid; text-align: center">${
                  e.quantity
                }</td>
                <td style="border: 1px solid">${formatCash(
                  (e.product.price * e.quantity).toString()
                )}</td>
              </tr>`
            )
            .join('')}
        </table>
        <h1>Tổng Thanh Toán: ${formatCash(totalBill.toString())} VND</h1>
        <h1>Cám Ơn Bạn</h1>
      `,
    };
    // gửi mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent' + info.response);
      }
    });
    const clearCart = await req.user.clearCart();
    return res.status(200).json({ status: 200, msg: 'Order Created!' });
  } catch (err) {
    res.status(200).json({
      msg: 'server-error',
    });
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ creator: req.user._id });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({
      msg: 'server-error',
    });
  }
};
