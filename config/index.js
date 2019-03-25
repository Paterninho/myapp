const config = {}

config.JWT_KEY = 'projeto42_jwt_secret_key';
config.MONGO_URL = 'mongodb://localhost:27017/projeto42_';
config.SALT_ROUNDS = 13;

module.exports = config;