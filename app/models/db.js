const config = require('../config');
const Sequelize = require('sequelize');

const { db: { host, password, port, user, name } } = config;
const sequelize = new Sequelize(`mariadb://${user}:${password}@${host}:${port}/${name}`, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;
