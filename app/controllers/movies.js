'use strict';

const Controller = require('./controller');
const OMDbProxy = require('../utils/omdb-proxy');
const { Movie } = require('../models');

class MoviesController extends Controller {
    
    constructor(request, response) {
        
        super(request, response);
        
        this.omdbApi = new OMDbProxy();
        this.model = Movie;
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
