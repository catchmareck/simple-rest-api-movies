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
        const movie = proxy.getMovie({ t: 'Harry Potter', type: 'movie', y: 2011, plot: 'short' });
        
        expect(getStub.called).to.be.true;
        sinon.assert.calledWith(getStub, { uri: undefined, qs: { t: 'Harry Potter', type: 'movie', y: 2011, plot: 'short', apiKey: undefined }, json: true });
    });

    it('should not include undefined values in the options.qs', function () {
        
        const rp = require('request-promise');
        const getStub = sandbox.stub(rp, 'get').resolves({});
        
        const proxy = new OMDbProxy();
        const movie = proxy.getMovie({ t: 'Harry Potter', type: undefined, y: undefined, plot: undefined });
        
        sinon.assert.calledWith(getStub, { uri: undefined, qs: { t: 'Harry Potter', apiKey: undefined }, json: true });
    });
});