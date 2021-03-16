const express = require('express');
const helmet = require('helmet');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// подключаем заданные переменные окружения
require('dotenv').config();

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const limiter = require('./config/rateLimitConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGODB_SERVER } = require('./config/index');

const { PORT = 3010 } = process.env;

// подключаемся к БД mongo
mongoose.connect(MONGODB_SERVER, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// выводим в консоль, что мы подключились к БД mongo
/* eslint-disable no-console */
mongoose.connection.on('open', () => console.log('DB connected!'));

app.use(helmet());

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// подключаем логгер запросов(до обработчиков)
app.use(requestLogger);

// подключаем настройку числа запросов к любым api
app.use(limiter);

app.use('/', router);

// подключаем логгер ошибок (после обработчиков, но до обработчика ошибок)
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
