'use strict';

const config = require('../config');
class OMDbProxy {
    
    getMovie({ t, type, y, plot, r = 'json', v = 1 }) {

        const rp = require('request-promise');
        const options = {
            uri: config.api.url,
            qs: {
                t,
                ...type && { type },
                ...y && { y },
                ...plot && { plot },
                apiKey: config.api.key
            },
            json: true
        };
        return rp.get(options)
            .then(({ imdbID, Title, Year, Runtime, Genre, Director, Plot, Poster, Website }) => (
                    {imdbID, Title, Year, Runtime, Genre, Director, Plot, Poster, Website}
                )
            );
    }
}

module.exports = OMDbProxy;
