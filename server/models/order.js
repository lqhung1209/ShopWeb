const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  products: [{ type: Object, required: true }],
});

module.exports = mongoose.model('Order', orderSchema);
