'use strict';

const OMDbProxy = require('../utils/omdb-proxy');
const { Movie } = require('../models');

class MoviesController {
    
    constructor(request, response) {
        
        this.request = request;
        this.response = response;
        
        this.requestBody = {};
        
        this.omdbApi = new OMDbProxy();
        
        this.model = Movie;
        
        this.setRequestBody();
    }
    
    setRequestBody() {

        this.requestBody = this.request.body;
    }
    
    apiFetch() {
        
        const { title, type, year, plot } = this.requestBody;
        const body = { t: title, type, y: year, plot };
        return this.omdbApi.getMovie(body);
    }
    
    dbFetch() {
        
        return this.model.findAll();
    }
    
    saveMovie(movie) {
        
        return this.model.create(movie);
    }
}

module.exports = MoviesController;
