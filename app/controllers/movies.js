'use strict';

const OMDbProxy = require('../utils/omdb-proxy');

class MoviesController {
    
    constructor(request, response) {
        
        this.request = request;
        this.response = response;
        
        this.requestBody = {};
        
        this.omdbApi = new OMDbProxy();
    }
    
    fetch() {
        
        return this.omdbApi.getMovie();
    }
}

module.exports = MoviesController;
