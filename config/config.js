require('dotenv').config();

module.exports = {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOST: process.env.MONGO_HOST || 'mongo', // use the name of the mongo service
    MONGO_PORT: process.env.MONGO_PORT || 27017, // use default port if env variable not present
    MONGO_DATABASE: process.env.MONGO_DATABASE,
};
