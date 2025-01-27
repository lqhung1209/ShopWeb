const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  message: [
    {
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Chat', chatSchema);
