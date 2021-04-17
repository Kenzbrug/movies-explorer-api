const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const {
  NotFound, Conflict, Unauthorized, BadRequest,
} = require('../errors');
const {
  USER_NOT_FOUND,
  USED_EMAIL,
  BAD_REGISTRATION,
  EMAIL_IS_BUSY,
} = require('../config/errors');

const { JWT_SECRET, JWT_TTL } = require('../config/index');

// получаем информацию о пользователе
const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(err.message));
      }
      return next(err);
    });
};

// создаем нового пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(USED_EMAIL);
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
        }))
        .then(({ _id }) => {
          const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_TTL });
          res.send({ _id, email, token });
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(BAD_REGISTRATION);
      }
      return bcrypt.compare(password, user.password).then((isValid) => {
        if (isValid) {
          return user;
        }
        throw new Unauthorized(BAD_REGISTRATION);
      });
    })
    .then(({ _id }) => {
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_TTL });
      res.send({ token });
    })
    .catch(next);
};

// обновляем данные пользователя
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(EMAIL_IS_BUSY);
      }
      User.findByIdAndUpdate(
        req.user._id,
        { email, name },
        {
          new: true, // then получит на вход обнавленные данные
          runValidators: true, // валидация данных перед изменением
        },
      ).then((data) => {
        if (data) {
          return res.send(data);
        }
        throw new NotFound(USER_NOT_FOUND);
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  updateUser,
  getProfile,
};
