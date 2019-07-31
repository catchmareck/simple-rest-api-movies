'use strict';

const log = require('../logger');
class OMDbProxy {
    
    async getMovie() {

        const rp = require('request-promise');
        const response = await rp.get().catch(({ message }) => log.error(message));
        let movie = {};
        
        if (response) {

            const { Title, Year, Runtime, Genre, Director, Plot, Poster, Ratings, Website } = response;
            movie = { Title, Year, Runtime, Genre, Director, Plot, Poster, Ratings, Website };
        }
        
        return movie;
    }
}

module.exports = OMDbProxy;
