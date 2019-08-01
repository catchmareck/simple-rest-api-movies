'use strict';

const sinon = require('sinon');
const { expect } = require('chai');
const OMDbProxy = require('../../app/utils/omdb-proxy');

let sandbox;

describe('Utility: OMDb Proxy', function () {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call the OMDb API using GET method', function () {
        
        const rp = require('request-promise');
        const getStub = sandbox.stub(rp, 'get').resolves({});
        
        const proxy = new OMDbProxy();
        const movie = proxy.getMovie({});
        
        expect(getStub.called).to.be.true;
    });
});