const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');

const register = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .pattern(new RegExp(/[А-Яа-яёЁ0-9A-Za-z -]+$/i))
      .messages({
        'string.min': 'Минимум 2 символа в поле Имя',
        'string.max': 'Максимум 30 символов',
      }),
    password: Joi.string().min(4).required()
      .pattern(new RegExp(/[0-9a-zA-Z!@#$%^&*:]/i))
      .messages({
        'string.min': 'Минимум 4 символа в поле пароля',
        'any.required': 'Обязательное поле для заполенния поле Пароля',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (isEmail(value)) {
        return value;
      }
      return helper.messages('Неправильно введен email при регистрации');
    })
      .messages({
        'any.required': 'Обязательно для заполенния поле email',
      }),
  }).unknown(true),
});

module.exports = { register };
