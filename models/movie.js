const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /[А-Яа-яёЁ0-9A-Za-z \-:]+$/i;
        return regex.test(v);
      },
    },
  },
  director: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /[А-Яа-яёЁ0-9A-Za-z -]+$/i;
        return regex.test(v);
      },
    },
  },
  duration: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        const regex = /^[0-9]*$/i;
        return regex.test(v);
      },
    },
  },
  year: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        const regex = /^[0-9]*$/i;
        return regex.test(v);
      },
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^[А-Яа-яёЁ0-9 \-:?()_=+[\]#№@!",.;]+$/i;
        return regex.test(v);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат почты',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат почты',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат почты',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        const regex = /^[0-9]*$/i;
        return regex.test(v);
      },
    },
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^[А-Яа-яёЁ0-9 \-:]+$/i;
        return regex.test(v);
      },
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^[A-Za-z0-9 \-:]+$/i;
        return regex.test(v);
      },
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
