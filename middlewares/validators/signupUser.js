const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');

const signupUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .pattern(new RegExp(/[А-Яа-яёЁ0-9A-Za-z -]+$/i))
      .messages({
        'string.min': 'Минимум 2 символа в поле Имя',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Обязательно для заполенния поле name',
      }),
    password: Joi.string().min(4).required()
      .pattern(new RegExp(/[0-9a-zA-Z!@#$%^&*:]/i))
      .messages({
        'string.min': 'Минимум 4 символа в поле пароля',
        'any.required': 'Обязательное поле для заполенния поле пароля',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (isEmail(value)) {
        return value;
      }
      return helper.message('Неправильно введен email при регистрации');
    })
      .messages({
        'any.required': 'Обязательно для заполенния поле email',
      }),
  }),
});

module.exports = { signupUser };
