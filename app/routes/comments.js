'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const CommentsController = require('../controllers/comments');

router.post('/', (request, response) => {
    
    const controller = new CommentsController(request, response);
    const { movieId, content } = controller.getRequestBody();
    
    controller.create({ movieId, content, userId: null })
        .then(response.send.bind(response))
        .catch(({ message }) => response.status(500).send({ message }));
});

router.get('/', (request, response) => {
    
    const controller = new CommentsController(request, response);
    
    controller.dbFetchAll()
        .then(response.send.bind(response))
        .catch(({ message }) => response.status(500).send({ message }));
});

module.exports = router;
