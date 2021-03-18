const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');

const signinUser = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(4)
      .pattern(new RegExp(/[0-9a-zA-Z!@#$%^&*:]/i))
      .messages({
        'string.min': 'Минимум 4 символа в поле пароля',
        'any.required': 'Обязательное поле для заполенния поле Пароля',
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

module.exports = { signinUser };
