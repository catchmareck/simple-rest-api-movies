'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const MoviesController = require('../controllers/movies');

router.post('/', (request, response) => {

    const controller = new MoviesController(request, response);
    
    controller.apiFetch()
        .then(
            ({ imdbID, Title, Year, Runtime, Genre, Director, Plot, Poster, Website }) => 
                controller.saveMovie({
                    imdbId: imdbID,
                    title: Title,
                    year: Year,
                    runtime: Runtime,
                    genre: Genre,
                    director: Director,
                    plot: Plot,
                    poster: Poster,
                    website: Website
                })
        )
        .then(response.send.bind(response))
        .catch(({ message }) => response.status(500).send({ message }));
});

router.get('/', (request, response) => {

    const controller = new MoviesController(request, response);

    controller.dbFetch()
        .then(response.send.bind(response))
        .catch(({ message }) => response.status(500).send({ message }));
});

module.exports = router;