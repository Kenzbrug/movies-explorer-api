const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = require('./errors');

const limiterConfig = rateLimit({
  windowMs: 15 * 60 * 100000, // количество запросов за 15 минут
  max: 100, // количество подключений с одного IP адреса за интервал времени
  message: RATE_LIMIT,
});

module.exports = limiterConfig;
