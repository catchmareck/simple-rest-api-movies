'use strict';

const Sequelize = require('sequelize');
const db = require('./db');

class Movie extends Sequelize.Model {}
Movie.init({
    movieId: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    imdbId: { type: Sequelize.STRING, unique: true },
    title: { type: Sequelize.STRING, unique: false },
    year: { type: Sequelize.INTEGER },
    genre: { type: Sequelize.STRING },
    plot: { type: Sequelize.TEXT },
    poster: { type: Sequelize.STRING }
}, {
    sequelize: db,
    underscored: true,
    tableName: 'sra_movies'
});

module.exports = Movie;
