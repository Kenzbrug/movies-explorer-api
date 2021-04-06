const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const signupUserValidator = require('../middlewares/validators/signupUser');
const signinUserValidator = require('../middlewares/validators/signinUser');
const { login, createUser } = require('../controllers/users');
const { NotFound } = require('../errors');
const { BAD_ROUTER } = require('../config/errors');

// роуты, не требующие авторизации
router.post('/signin', signinUserValidator.signinUser, login);
router.post('/signup', signupUserValidator.signupUser, createUser);
// роуты, требующие авторизации
router.use('/users', auth, userRoutes);
router.use('/movies', auth, moviesRoutes);

// обработка ошибки при некорректном вводе адреса
router.use('*', auth, () => {
  throw new NotFound(BAD_ROUTER);
});

module.exports = router;
