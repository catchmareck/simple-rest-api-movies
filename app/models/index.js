'use strict';

const db = require('./db');
const Movie = require('./movie');

module.exports = {
    sequelize: db,
    Movie
};
