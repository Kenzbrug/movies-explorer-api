const { celebrate, Joi } = require('celebrate');

const deleteMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = { deleteMovieId };
