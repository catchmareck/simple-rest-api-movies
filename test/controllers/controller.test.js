'use strict';

const sinon = require('sinon');
const { expect } = require('chai');

const Controller = require('../../app/controllers/controller');

let controller = null;
let sandbox;

describe('Controller: Controller', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    before(() => {

        controller = new Controller({body: {}}, {});
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

        it('model property', function () {

            expect(controller).to.have.property('model');
        });
    });

    it('should set requestBody in constructor', function () {

        const fakeBody = { fake: 'key' };
        const fakeRequest = { body: fakeBody };

        const setRequestBodyStub = sandbox.spy(Controller.prototype, 'setRequestBody');
        const controller = new Controller(fakeRequest);

        expect(setRequestBodyStub.called).to.be.true;
        expect(controller.requestBody).to.deep.equal(fakeBody);
    });

    it('should get requestBody', function () {


        const fakeBody = { fake: 'key' };
        const fakeRequest = { body: fakeBody };

        const controller = new Controller(fakeRequest);
        
        const result = controller.getRequestBody();
        
        expect(result).to.deep.equal(fakeBody);
    });
});