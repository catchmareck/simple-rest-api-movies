'use strict';

const sinon = require('sinon');
const { expect } = require('chai');

const CommentsController = require('../../app/controllers/comments');

let controller = null;
let sandbox;

describe('Controller: Comments', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    before(() => {

        controller = new CommentsController({body: {}}, { status() {} });
    });

    after(() => {

        controller = null;
    });

    describe('should have properties:', function () {

        it('movieModel property', function () {

            expect(controller).to.have.property('movieModel');
        });
    });
    
    it('should save a comment in db', function () {

        const findAllStub = sandbox.stub(controller.movieModel, 'findAll').withArgs({ where: { movieId: 1 } }).resolves([{ movieId: 1 }]);
        const createStub = sandbox.stub(controller.model, 'create').resolves({ setMovie() {} });

        return controller.create({ movieId: 1 })
            .then(() =>{

                expect(findAllStub.called).to.be.true;
                expect(createStub.called).to.be.true
            });
    });

    it('should respond with 404 status code if movie does not exist', function () {
        
        const findAllStub = sandbox.stub(controller.movieModel, 'findAll').withArgs({ where: { movieId: 1 } }).resolves([]);
        const statusStub = sandbox.stub(controller.response, 'status').withArgs(404).returns();
        
        return controller.create({ movieId: 1 })
            .then((result) => {
                
                expect(result).to.be.empty;
                expect(findAllStub.called).to.be.true;
                expect(statusStub.called).to.be.true
            });
    });

    it('should fetch all comments from DB', function () {
        
        const findAllStub = sandbox.stub(controller.model, 'findAll').resolves([]);
        
        return controller.dbFetchAll()
            .then((result) => {
                
                expect(findAllStub.called).to.be.true;
                expect(result).to.be.an('array');
            })
    });

    it('should fetch all comments for a movie', function () {
        
        const findAllStub = sandbox.stub(controller.model, 'findAll').withArgs({ where: { movieId: 1 } }).resolves([]);
        
        return controller.dbFetchByMovie(1)
            .then((result) => {
                
                expect(findAllStub.called).to.be.true;
                expect(result).to.be.an('array');
            });
    });
});