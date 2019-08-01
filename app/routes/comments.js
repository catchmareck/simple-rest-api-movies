'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const validate = require('../middlewares/validate-request');
const CommentsSchema = require('./validation-schemas/comments-schema');

const CommentsController = require('../controllers/comments');

router.post('/', validate(CommentsSchema.create), (request, response) => {
    
    const controller = new CommentsController(request, response);
    const { movieId, content } = controller.getRequestBody();
    
    controller.create({ movieId, content, userId: null })
        .then(response.send.bind(response))
        .catch(({ message }) => response.status(500).send({ message }));
});

router.get('/', validate(CommentsSchema.fetchAll), (request, response) => {
    
    const controller = new CommentsController(request, response);
    
    controller.dbFetchAll()
        .then(response.send.bind(response))
        .catch(({ message }) => response.status(500).send({ message }));
});

module.exports = router;
