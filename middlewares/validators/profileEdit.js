const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');

const profileEdit = celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom((value, helper) => {
      if (isEmail(value)) {
        return value;
      }
      return helper.messages('Неправильно введен email при регистрации');
    }),
    name: Joi.string().min(2).max(30)
      .pattern(new RegExp(/[А-Яа-яёЁ0-9A-Za-z -]+$/i))
      .messages({
        'string.min': 'Минимум 2 символа в поле имя',
        'string.max': 'Максимум 30 символов в поле имя',
      }),
  }).unknown(true),
});

module.exports = { profileEdit };
