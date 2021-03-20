const { celebrate, Joi } = require('celebrate');

const signupUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

module.exports = { signupUser };
