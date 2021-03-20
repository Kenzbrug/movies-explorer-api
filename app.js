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
const { MONGODB_SERVER, MONGOOSE_CONFIG, PORT } = require('./config/index');

// подключаемся к БД mongo
mongoose.connect(MONGODB_SERVER, MONGOOSE_CONFIG);

app.use(helmet());

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// подключаем логгер запросов(до обработчиков)
app.use(requestLogger);

// подключаем настройку числа запросов к любым api
app.use(limiter);

app.use('/', router);

// подключаем логгер ошибок (после обработчиков, но до обработчика ошибок)
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
