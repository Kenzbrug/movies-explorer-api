const router = require('express').Router();
const controller = require('../controllers/movies');
const findMovieIdIdValidator = require('../middlewares/validators/findMovieId');
const creatMovieValidator = require('../middlewares/validators/createMovie');

router.get('/', controller.getMovies);
router.post('/', creatMovieValidator.createMovieValid, controller.createMovie);
router.delete('/:id', findMovieIdIdValidator.findMovieId, controller.deleteMovie);

module.exports = router;
