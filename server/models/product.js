const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
  long_desc: {
    type: String,
    required: true,
  },
  img1: {
    type: String,
    required: true,
  },
  img2: {
    type: String,
    required: true,
  },
  img3: {
    type: String,
    required: true,
  },
  img4: {
    type: String,
    required: true,
  },
  img5: {
    type: String,
    // do data gốc đang chỉ có 4 image
    required: false,
  },
  inventory: {
    type: Number,
    required: true,
  },
  // creator: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});

module.exports = mongoose.model('Product', productSchema);
