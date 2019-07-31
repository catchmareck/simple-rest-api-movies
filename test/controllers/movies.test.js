'use strict';

const sinon = require('sinon');
const { expect } = require('chai');

const MoviesController = require('../../app/controllers/movies');

let controller = null;
let sandbox;

describe('Controller: Movies', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    before(() => {
        
        controller = new MoviesController({}, {});
    });
    
    after(() => {
        
        controller = null;
    });

    describe('should have properties:', function () {

        it('request property', function () {

            expect(controller).to.have.property('request');
        });

        it('response property', function () {

            expect(controller).to.have.property('response');
        });

        it('requestBody property', function () {
            
            expect(controller).to.have.property('requestBody');
        });

        it('OMDb API Proxy property', function () {

            expect(controller).to.have.property('omdbApi');
        });
    });

    it('should fetch movie based on title', async () => {

        const fakeMovie = {
            'Title': '',
            'Year': '',
            'Runtime': '',
            'Genre': '',
            'Director': '',
            'Plot': '',
            'Poster': '',
            'Ratings': [],
            'Website': ''
        };
        const rp = require('request-promise');
        const getStub = sandbox.stub(rp, 'get').resolves(fakeMovie);
        const movie = await controller.fetch({ title: 'Harry Potter' });

        expect(movie).to.be.an('object');
        expect(movie).to.have.all.keys(['Title', 'Year', 'Runtime', 'Genre', 'Director', 'Plot', 'Poster', 'Ratings', 'Website']);
        expect(movie.Ratings).to.be.an('array');
    });

    it('should call OMDbProxy when fetching a movie', function () {
        
        const getMovieStub = sandbox.stub(controller.omdbApi, 'getMovie').returns();
        
        controller.fetch();
        
        expect(getMovieStub.called).to.be.true;
    });

    it('should call proxy with request body params', function () {
        
        const getMovieStub = sandbox.stub(controller.omdbApi, 'getMovie').returns();

        controller.fetch();

        sinon.assert.calledWith(getMovieStub, { t: 'Harry Potter', type: 'movie', y: '', plot: 'short', r: 'json', v: 1 });
    });
});