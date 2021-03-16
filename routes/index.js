const router = require('express').Router();
const bodyParser = require('body-parser');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const registerValidator = require('../middlewares/validators/register');
const { login, createUser } = require('../controllers/users');
const { NotFound } = require('../errors');

const jsonParser = bodyParser.json();

// роуты, не требующие авторизации
router.post('/signin', jsonParser, registerValidator.register, login);
router.post('/signup', jsonParser, registerValidator.register, createUser);
// роуты, требующие авторизации
router.use('/users', jsonParser, auth, userRoutes);
router.use('/movies', jsonParser, auth, moviesRoutes);

// обработка ошибки при некорректном вводе адреса
/* eslint-disable no-unused-vars */
router.use('*', (req, res) => { // res, req
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
