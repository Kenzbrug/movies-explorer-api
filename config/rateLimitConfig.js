const rateLimit = require('express-rate-limit');

const limiterConfig = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // ограничение подключения до 100 раз на каждое подключение с одного IP адреса
});

module.exports = limiterConfig;
