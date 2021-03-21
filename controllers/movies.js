const Movie = require('../models/movie');
const { NotFound, Forbidden, BadRequest } = require('../errors');
const {
  BAD_DATA, VIDEO_NOT_FOUND, FORBIDDEN_DELETE_MOVIE, BAD_ID_MOVIE,
} = require('../config/errors');

// запрос на отображение только карточек с фильмами
const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// создаем карточку фильма
const createMovie = (req, res, next) => {
  const {
    _id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    _id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequest(BAD_DATA);
      }
      res.send({
        _id,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(BAD_DATA));
      }
      return next(err);
    });
};

// удаляем карточку фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id).select('+owner')
    .then((movie) => {
      if (movie === null) {
        throw new NotFound(VIDEO_NOT_FOUND);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new Forbidden(FORBIDDEN_DELETE_MOVIE);
      }
      Movie.findByIdAndDelete(movie._id)
        .then((data) => data);
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
        return next(new BadRequest(BAD_ID_MOVIE));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
