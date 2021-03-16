const Movie = require('../models/movie');
const { NotFound, Forbidden, BadRequest } = require('../errors');

// запрос на отображение всех карточек с фильмами
const getMovies = (req, res) => {
  Movie.find({}) // ищем все карточки
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// создаем карточку фильма
const createMovie = (req, res, next) => {
  const { ...props } = req.body;
  // res.setHeader("Content-Type": "application/json")
  const owner = req.user._id;
  Movie.create({ ...props, owner })
    .then((movie) => {
      if (!movie) {
        throw new BadRequest('Введены неверные данные');
      }
      res.status(200).send(movie);
    })
    .catch(next);
};

// удаляем карточку фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((card) => {
      if (card === null) {
        throw new NotFound('карточка ненайдена');
      } else {
        const stringCard = JSON.stringify(card);
        const objectCard = JSON.parse(stringCard);
        if (objectCard.owner !== req.user._id) {
          throw new Forbidden('Вы не можете удалить чужую карточку');
        } else {
          Movie.findByIdAndDelete(objectCard._id)
            .then((data) => data);
        }
      }
      res.status(200).send(card);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(err.message));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
