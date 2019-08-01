'use strict';

const Controller = require('./controller');
const { Comment } = require('../models');

class CommentsController extends Controller {
    
    constructor(request, response) {
        
        super(request, response);
        
        this.model = Comment;
    }
    
    create(comment) {
        
        return this.model.create(comment);
    }
    
    dbFetchAll() {
        
        return this.model.findAll();
    }

    dbFetchByMovie(id) {
        
        return this.model.findAll({ movieId: id });
    }
}

module.exports = CommentsController;
