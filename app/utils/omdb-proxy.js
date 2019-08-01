'use strict';

const log = require('../logger');
const config = require('../config');
class OMDbProxy {
    
    async getMovie({ t, type, y, plot, r = 'json', v = 1 }) {

        const rp = require('request-promise');
        const options = {
            qs: { t, type, y, plot, r, v, apiKey: config.api.key }
        };
        const response = await rp.get(options).catch(({ message }) => log.error(message));
        let movie = {};
        
        if (response) {

            const { imdbID, Title, Year, Runtime, Genre, Director, Plot, Poster, Website } = response;
            movie = { imdbID, Title, Year, Runtime, Genre, Director, Plot, Poster, Website };
        }
        
        return movie;
    }
}

module.exports = OMDbProxy;
