'use strict';

const db = require('./db');
const Movie = require('./movie');
const Comment = require('./comment');

Movie.hasMany(Comment, { foreignKey: 'movie_id' });

module.exports = {
    sequelize: db,
    Movie,
    Comment
};
