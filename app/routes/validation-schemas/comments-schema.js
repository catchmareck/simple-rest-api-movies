'use strict';

const Joi = require('joi');

module.exports = {
    fetchAll: {
        params: {},
        body: {}
    },
    fetchByMovie: {
        params: {
            movieId: Joi.string().regex(/[0-9]+/).required().error(new Error('movieId is required'))
        },
        body: {}
    },
    create: {
        params: {},
        body: {
            movieId: Joi.number().required().error(new Error('movieId is invalid')),
            userId: Joi.number().allow([null]).optional(),
            content: Joi.string().min(10).required().error(new Error('content is invalid'))
        },
    }
};
