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

        it('model property', function () {
            
            expect(controller).to.have.property('model');
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

    it('should set requestBody in constructor', function () {
        
        const fakeBody = { fake: 'key' };
        const fakeRequest = { body: fakeBody };
        
        const setRequestBodyStub = sandbox.spy(MoviesController.prototype, 'setRequestBody');
        const controller = new MoviesController(fakeRequest);

        expect(setRequestBodyStub.called).to.be.true;
        expect(controller.requestBody).to.deep.equal(fakeBody);
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