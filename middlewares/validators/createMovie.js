const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(1).max(70).required()
      .pattern(new RegExp(/[А-Яа-яёЁ0-9A-Za-z \-:]+$/i))
      .messages({
        'string.min': 'Минимум 1 символ в поле страна фильма',
        'string.max': 'Максимум 70 символов в поле страна фильма',
        'any.required': 'Обязательно для заполенния',
      }),
    director: Joi.string().min(1).max(70).required()
      .pattern(new RegExp(/[А-Яа-яёЁ0-9A-Za-z -]+$/i))
      .messages({
        'string.min': 'Минимум 1 символа в поле режиссер фильма',
        'string.max': 'Максимум 70 символов в поле режиссер фильма',
        'any.required': 'Обязательно для заполенния',
      }),
    duration: Joi.number().required().integer()
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
    year: Joi.number().required().integer()
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
    description: Joi.string().min(1).max(300).required()
      .pattern(new RegExp(/^[А-Яа-яёЁ0-9 \-:?()_=+[\]#№@!",.;]+$/i))
      .messages({
        'string.min': 'Минимум 1 символа в поле описание фильма',
        'string.max': 'Максимум 300 символов в поле описание фильма',
        'any.required': 'Обязательно для заполенния',
      }),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.messages('Неверно введен адрес обложки к фильму');
    })
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.messages('Неверно введен адрес трейлера к фильму');
    })
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.messages('Неверно введен адрес миниатюры к фильму');
    })
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
    nameRU: Joi.string().min(1).max(70).required()
      .pattern(new RegExp(/^[А-Яа-яёЁ0-9 \-:]+$/i))
      .messages({
        'string.min': 'Минимум 1 символ в поле название фильма по-русски',
        'string.max': 'Максимум 70 символов в поле название фильма по-русски',
        'any.required': 'Обязательно для заполенния',
      }),
    nameEN: Joi.string().min(1).max(70).required()
      .pattern(new RegExp(/^[A-Za-z0-9 \-:]+$/i))
      .messages({
        'string.min': 'Минимум 1 символ в поле название фильма по-английски',
        'string.max': 'Максимум 70 символов в поле название фильма по-английски',
        'any.required': 'Обязательно для заполенния',
      }),
  }).unknown(true),
});

module.exports = { createMovieValid };
