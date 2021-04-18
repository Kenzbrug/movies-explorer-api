const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { BAD_URL_IMAGE, BAD_URL_TRAILER, BAD_URL_THUMBNAIL } = require('../config/errors');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: BAD_URL_IMAGE,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: BAD_URL_TRAILER,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: BAD_URL_THUMBNAIL,
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // api не будет возвращать id создателя
    select: false,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
