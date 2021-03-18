const { celebrate, Joi } = require('celebrate');

const deleteMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24)
      .messages({
        'string.length': 'Несуществующий id карточки',
      }),
  }),
});

module.exports = { deleteMovieId };
