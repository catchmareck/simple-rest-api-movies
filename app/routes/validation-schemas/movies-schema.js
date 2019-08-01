'use strict';

const Joi = require('joi');

module.exports = {
    fetchAll: {
        params: {},
        body: {}
    },
    create: {
        params: {},
        body: {
            title: Joi.string().required().error(new Error('title is invalid')),
            type: Joi.string().allow(['movie', 'series', 'episode']).optional().error(new Error('type is invalid')),
            year: Joi.number().min(1895).optional().error(new Error('year is invalid')),
            plot: Joi.string().allow(['short', 'full']).optional().error(new Error('plot is invalid'))
        }
    }
};
