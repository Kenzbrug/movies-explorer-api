require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'vEry-str0ng-sEcrEt-p@$$w0rd',
  JWT_TTL: process.env.JWT_TTL || '7d',
  MONGODB_SERVER: process.env.MONGODB_SERVER || 'mongodb://localhost:27017/bitfilmsdb',
  MONGOOSE_CONFIG: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};

module.exports = config;
