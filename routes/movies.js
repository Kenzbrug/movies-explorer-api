const router = require('express').Router();
const controller = require('../controllers/movies');
const deleteMovieIdValidator = require('../middlewares/validators/deleteMovieId');
const creatMovieValidator = require('../middlewares/validators/createMovie');

router.get('/', controller.getMovies);
router.post('/', creatMovieValidator.createMovieValid, controller.createMovie);

router.delete('/:id', deleteMovieIdValidator.deleteMovieId, controller.deleteMovie);

module.exports = router;
