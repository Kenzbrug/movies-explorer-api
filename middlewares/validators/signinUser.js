const { celebrate, Joi } = require('celebrate');

const signinUser = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

module.exports = { signinUser };
