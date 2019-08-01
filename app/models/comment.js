'use strict';

const Sequelize = require('sequelize');
const db = require('./db');

class Comment extends Sequelize.Model {}
Comment.init({
    commentId: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    content: { type: Sequelize.TEXT },
    userId: { type: Sequelize.INTEGER, allowNull: true, defaultValue: null }
}, {
    sequelize: db,
    underscored: true,
    tableName: 'sra_comments'
});

module.exports = Comment;
