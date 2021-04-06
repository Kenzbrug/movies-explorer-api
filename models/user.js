const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { BAD_VALID_EMAIL } = require('../config/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: BAD_VALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    // api не будет возвращать хеш пароля
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
