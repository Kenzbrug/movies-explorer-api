const { CelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  } if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  return res.status(400).send({ message: 'сервер не смог обработать запрос, ошибка синтаксиса' });
};

module.exports = errorHandler;
