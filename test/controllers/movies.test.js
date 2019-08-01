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
        
        controller = new MoviesController({body: {}}, {});
    });
    
    after(() => {
        
        controller = null;
    });

    describe('should have properties:', function () {

        it('OMDb API Proxy property', function () {

            expect(controller).to.have.property('omdbApi');
        });
    });

    it('should call OMDbProxy when fetching a movie', function () {
        
        const getMovieStub = sandbox.stub(controller.omdbApi, 'getMovie').returns();
        
        controller.apiFetch();
        
        expect(getMovieStub.called).to.be.true;
    });

    it('should call proxy with request body params', function () {
        
        const getMovieStub = sandbox.stub(controller.omdbApi, 'getMovie').returns();
        
        controller.requestBody = { title: 'Harry Potter', type: 'movie', year: '', plot: 'short' };

        controller.apiFetch();

        sinon.assert.calledWith(getMovieStub, { t: 'Harry Potter', type: 'movie', y: '', plot: 'short' });
    });

    it('should save movie in the DB', function () {
        
        const modelStub = sandbox.stub(controller.model, 'create').resolves();
        
        controller.saveMovie({})
            .then(() => expect(modelStub.called).to.be.true);
    });

    it('should fetch movies from DB', function () {
        
        const modelStub = sandbox.stub(controller.model, 'findAll').resolves([]);
        
        return controller.dbFetch()
            .then((result) => {

                expect(modelStub.called).to.be.true;
                expect(result).to.be.an('array');
            });
    });
});