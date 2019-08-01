'use strict';

const Joi = require('joi');

module.exports = function validate (schema) {

    return function (request, response, next) {

        const req = {
            body: Object.assign({}, request.body),
            params: Object.assign({}, request.params),
            payload: Object.assign({}, request.payload),
            query: Object.assign({}, request.query)
        };

        Joi.validate(req, schema, { allowUnknown: true }, error => {

            if (error) {

                response.status(400);
                response.send({ message: error.message || 'Bad request', errors: [error] });

                return;
            }

            next();
        });
    };
};
