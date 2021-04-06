const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');

const profileEdit = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (isEmail(value)) {
        return value;
      }
      return helper.message('Неправильно введен email при регистрации');
    }),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = { profileEdit };
