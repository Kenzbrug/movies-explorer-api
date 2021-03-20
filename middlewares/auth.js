const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = require('../config');
const { Unauthorized } = require('../errors');
const { NOT_AUTHORIZED } = require('../config/errors');

const handleAuthError = () => {
  throw new Unauthorized(NOT_AUTHORIZED);
};

const auth = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }
  // извлечём токен
  const token = authorization.replace(/^Bearer /, '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    return handleAuthError();
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = auth;
