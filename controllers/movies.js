const Movie = require('../models/movie');
const { NotFound, Forbidden, BadRequest } = require('../errors');

// запрос на отображение всех карточек с фильмами
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }) // ищем все карточки
    .then((movies) => {
      const arrayMovues = movies.map((object) => {
        const newObjectMovie = {
          _id: object._id,
          country: object.country,
          director: object.director,
          duration: object.duration,
          year: object.year,
          description: object.description,
          image: object.image,
          trailer: object.trailer,
          nameRU: object.nameRU,
          nameEN: object.nameEN,
          thumbnail: object.thumbnail,
          movieId: object.movieId,
        };
        return newObjectMovie;
      });
      return res.send(arrayMovues);
    })
    .catch(next);
};

// создаем карточку фильма
const createMovie = (req, res, next) => {
  const { ...props } = req.body;
  const owner = req.user._id;
  Movie.create({ ...props, owner })
    .then((movie) => {
      if (!movie) {
        throw new BadRequest('Введены неверные данные');
      }
      const newObjectMovie = {
        _id: movie._id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
      };

      res.send(newObjectMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(err.message.split(':')[2].split(',')[0]));
      }
      return next(err);
    });
};

// удаляем карточку фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie === null) {
        throw new NotFound('Карточка ненайдена');
      } else {
        const stringMovie = movie.toString().split(',')[12].split(': ')[1];
        if (stringMovie !== req.user._id) {
          throw new Forbidden('Вы не можете удалить чужую карточку');
        } else {
          Movie.findByIdAndDelete(movie._id)
            .then((data) => data);
        }
      }
      const newObjectMovie = {
        _id: movie._id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
      };
      res.send(newObjectMovie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Некорректно переданы данные'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
