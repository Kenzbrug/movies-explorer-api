const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required().integer(),
    year: Joi.number().required().integer(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (isUrl(value)) {
        return value;
      }
      return helper.message('Неверно введен адрес обложки к фильму');
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (isUrl(value)) {
        return value;
      }
      return helper.message('Неверно введен адрес трейлера к фильму');
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (isUrl(value)) {
        return value;
      }
      return helper.message('Неверно введен адрес миниатюры к фильму');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    id: Joi.number().required().integer(),
  }),
});

module.exports = { createMovieValid };
