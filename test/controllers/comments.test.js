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

        controller = new CommentsController({body: {}}, {});
    });

    after(() => {

        controller = null;
    });

    it('should save a comment in db', function () {

        const createStub = sandbox.stub(controller.model, 'create').resolves();

        return controller.create()
            .then(() => expect(createStub.called).to.be.true);
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