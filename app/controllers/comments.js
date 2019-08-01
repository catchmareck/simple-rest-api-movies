'use strict';

const Controller = require('./controller');
const { Comment, Movie } = require('../models');

class CommentsController extends Controller {
    
    constructor(request, response) {
        
        super(request, response);
        
        this.model = Comment;
        this.movieModel = Movie;
    }
    
    create(comment) {
        
        return this.movieModel.findAll({ where: { movieId: comment.movieId } })
            .then(([movie]) => {
                
                if (!movie) throw new Error('Movie does not exist!');
                
                return this.model.create(comment)
                    .then((comm) => comm.setMovie(movie));
            });
    }
    
    dbFetchAll() {
        
        return this.model.findAll({ include: this.movieModel });
    }

    dbFetchByMovie(id) {
        
        return this.model.findAll({ where: { movieId: id } });
    }
}

module.exports = CommentsController;
