const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
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
  },
});

module.exports = mongoose.model('user', userSchema);
